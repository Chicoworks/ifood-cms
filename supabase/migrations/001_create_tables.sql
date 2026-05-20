-- =============================================
-- Landing Page Builder - Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUM types
-- =============================================
CREATE TYPE page_status AS ENUM ('draft', 'published');
CREATE TYPE version_type AS ENUM ('draft', 'published');

-- =============================================
-- Table: pages
-- =============================================
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  status page_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for slug lookups (public rendering)
CREATE INDEX idx_pages_slug ON pages (slug);
CREATE INDEX idx_pages_status ON pages (status);

-- =============================================
-- Table: page_versions
-- =============================================
CREATE TABLE page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  version_type version_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_versions_page_id ON page_versions (page_id);
CREATE INDEX idx_page_versions_type ON page_versions (page_id, version_type);

-- =============================================
-- Table: assets
-- =============================================
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  file_url VARCHAR(1024) NOT NULL,
  file_name VARCHAR(255),
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assets_page_id ON assets (page_id);

-- =============================================
-- Auto-update updated_at on pages
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================
-- RLS (Row Level Security) - basic policies
-- =============================================

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Public read for published pages (rendering)
CREATE POLICY "Public can read published pages"
  ON pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read published versions"
  ON page_versions FOR SELECT
  USING (
    version_type = 'published'
    AND EXISTS (
      SELECT 1 FROM pages WHERE pages.id = page_versions.page_id AND pages.status = 'published'
    )
  );

-- Authenticated users can do everything (admin)
CREATE POLICY "Authenticated users full access on pages"
  ON pages FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access on page_versions"
  ON page_versions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access on assets"
  ON assets FOR ALL
  USING (auth.role() = 'authenticated');

-- Public read for assets (images are public)
CREATE POLICY "Public can read assets"
  ON assets FOR SELECT
  USING (true);
