import { NextRequest, NextResponse } from 'next/server';

const PROPERTY_ID = process.env.GA_PROPERTY_ID;

interface ReportRequest {
  dateRange: { startDate: string; endDate: string };
  metrics: string[];
  dimensions?: string[];
}

export async function POST(request: NextRequest) {
  try {
    if (!PROPERTY_ID) {
      return NextResponse.json({ error: 'GA_PROPERTY_ID not configured' }, { status: 500 });
    }

    // Get Google OAuth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing Google OAuth token. Please re-login.' }, { status: 401 });
    }
    const token = authHeader.slice(7);

    const body: ReportRequest = await request.json();

    // Build GA4 Data API request
    const gaRequest: any = {
      dateRanges: [{ startDate: body.dateRange.startDate, endDate: body.dateRange.endDate }],
      metrics: body.metrics.map(m => ({ name: m })),
    };

    if (body.dimensions?.length) {
      gaRequest.dimensions = body.dimensions.map(d => ({ name: d }));
    }

    const GA_DATA_URL = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;

    const response = await fetch(GA_DATA_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gaRequest),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[Analytics API] GA4 error:', response.status, err);
      return NextResponse.json({ error: `GA4 error: ${response.status}`, details: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
