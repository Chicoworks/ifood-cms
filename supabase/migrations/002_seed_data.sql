-- =============================================
-- Seed: Landing page "Ecossistema iFood"
-- Dados extraídos dos componentes hardcoded
-- =============================================

-- Insert page
INSERT INTO pages (id, name, slug, status, created_at, updated_at)
VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'Ecossistema iFood',
  'ecossistema',
  'published',
  now(),
  now()
);

-- Insert published version with all blocks
INSERT INTO page_versions (id, page_id, content, version_type, created_at)
VALUES (
  'f1e2d3c4-b5a6-4f7e-8d9c-0b1a2f3e4d5c',
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  '{
    "blocks": [
      {
        "id": "block-navbar-001",
        "type": "navbar",
        "data": {
          "logo": "/images/ifood/logo.svg",
          "cta_text": "Entrar no portal",
          "cta_link": "#",
          "items": [
            { "label": "Delivery", "href": "/delivery", "has_dropdown": false },
            { "label": "Salão", "href": null, "has_dropdown": true },
            { "label": "iFood Pago", "href": "/ifood-pago", "has_dropdown": false },
            { "label": "Logística", "href": "/logistica", "has_dropdown": false },
            { "label": "Ads", "href": "/ads", "has_dropdown": false }
          ]
        }
      },
      {
        "id": "block-hero-001",
        "type": "hero",
        "data": {
          "title": ["Seu negócio pede", "ecossistema conectado"],
          "description": "Delivery, salão, pagamentos e logística em um só lugar. Conecte sua operação, amplifique seu crescimento e ofereça a melhor experiência aos seus clientes.",
          "cta_text": "Conheça",
          "cta_link": "#",
          "background_image": "/images/ifood/bg_ifood_ecossistema.png",
          "logo_decoration": "/images/ifood/Logo_decoration.svg"
        }
      },
      {
        "id": "block-vision-001",
        "type": "vision",
        "data": {
          "badge": "De Brasil e de comida a gente entende",
          "title": ["Conectamos milhares", "de restaurantes todos os dias"],
          "ratings_count": "+8Mi",
          "ratings_text": "+8 milhões de avaliações",
          "avatars": [
            "/images/ifood/avatar1.png",
            "/images/ifood/avatar2.png",
            "/images/ifood/avatar3.png"
          ],
          "cards": [
            {
              "id": 1,
              "title": "450 mil lojas parceiras",
              "bg_image": "/images/ifood/loja_bg.png",
              "icon": "/images/ifood/loja-icon.png",
              "variant": "lojas"
            },
            {
              "id": 2,
              "title": "180 milhões de pedidos/mês",
              "bg_image": "/images/ifood/pedidos_bg.png",
              "icon": "/images/ifood/pedido-icon.png",
              "variant": "pedidos"
            },
            {
              "id": 3,
              "title": "500 mil entregadores",
              "bg_image": "/images/ifood/entregador_bg.png",
              "icon": "/images/ifood/entregador-icon.png",
              "variant": "entregadores"
            }
          ]
        }
      },
      {
        "id": "block-growth-001",
        "type": "growth",
        "data": {
          "badge": "Cresça com a gente",
          "title": ["Para cada tipo de negócio,", "um iFood que te ajuda a vender mais"],
          "tabs": [
            {
              "id": "delivery",
              "label": "Delivery",
              "cards": [
                { "id": 1, "title": "CRM 360", "description": "Dados unificados que transformam clientes em vendas" },
                { "id": 2, "title": "PDV", "description": "Sistema de ponto de venda robusto e intuitivo" },
                { "id": 3, "title": "Totem", "description": "Autoatendimento inteligente para sua loja" },
                { "id": 4, "title": "Cardápio Digital", "description": "Cardápio interativo e fácil de gerenciar" },
                { "id": 5, "title": "Integrações", "description": "Conecte com os principais sistemas do mercado" },
                { "id": 6, "title": "Analytics", "description": "Dashboard com dados em tempo real" },
                { "id": 7, "title": "Gestão de Pedidos", "description": "Controle total de seus pedidos" },
                { "id": 8, "title": "Gateway de Pagamento", "description": "Múltiplas formas de pagamento seguras" }
              ]
            },
            {
              "id": "salao",
              "label": "Salão",
              "cards": [
                { "id": 1, "title": "Gerenciamento de Mesas", "description": "Controle eficiente de ocupação de mesas" },
                { "id": 2, "title": "Comanda Digital", "description": "Comanda eletrônica para melhor experiência" },
                { "id": 3, "title": "Reservas Online", "description": "Sistema de reservas integrado e automático" },
                { "id": 4, "title": "Menu Interativo", "description": "Cardápio digital com fotos e recomendações" },
                { "id": 5, "title": "Chamada de Garçom", "description": "Sistema inteligente de atendimento" },
                { "id": 6, "title": "Relatórios Detalhados", "description": "Análise completa do desempenho" },
                { "id": 7, "title": "Programa de Fidelização", "description": "Mantenha clientes engajados e voltando" },
                { "id": 8, "title": "Integração com Delivery", "description": "Unifique sua operação de salão e delivery" }
              ]
            }
          ]
        }
      },
      {
        "id": "block-integrated-001",
        "type": "integrated",
        "data": {
          "badge": "Visão integrada",
          "title": "Por que escolher o ecossistema completo do iFood?",
          "image": "/images/ifood/visao_integrada.png",
          "features": [
            {
              "id": 1,
              "title": "Delivery e Salão",
              "subtitle": "em uma plataforma",
              "description": "Gerencie pedidos online e experiências presenciais no mesmo lugar. Dados unificados, gestão simplificada, crescimento amplificado.",
              "icon": "/images/ifood/loja-icon.png"
            },
            {
              "id": 2,
              "title": "Visão 360°",
              "subtitle": "dos seus clientes",
              "description": "Conheça o histórico completo: o que pedem online, quando visitam o salão, preferências e ticket médio. Inteligência que nenhum concorrente oferece.",
              "icon": "/images/ifood/people_icon.png"
            },
            {
              "id": 3,
              "title": "Pagamentos, logística e",
              "subtitle": "gestão integrados",
              "description": "Recebimento automático, entregas eficientes e ferramentas de gestão que conversam entre si. Sem integrações complexas, sem dor de cabeça.",
              "icon": "/images/ifood/star_icon.png"
            }
          ]
        }
      },
      {
        "id": "block-results-001",
        "type": "results",
        "data": {
          "badge": "Resultado na prática",
          "title": ["O que nossos parceiros estão falando", "sobre vender com o iFood"],
          "testimonials": [
            {
              "id": 1,
              "name": "Gabriel",
              "company": "Pizza prime",
              "image": "/images/ifood/Gabriel_pizzaprime.png",
              "main_quote": "O iFood nos ajudou a triplicar a quantidade de clientes.",
              "full_quote": "As estratégias do iFood ajudaram a Pizza Prime a crescer e alcançar novos públicos. Hoje vendemos 2,5 milhões de pizzas por ano!",
              "rating": 5
            },
            {
              "id": 4,
              "name": "Ana Paula",
              "company": "Padaria da Vila",
              "image": "/images/ifood/testimoniial_4.png",
              "main_quote": "Expandimos para delivery sem gastar com estrutura própria.",
              "full_quote": "Éramos só uma padaria local. O iFood nos deu alcance municipal em poucos meses. Hoje nossos pães chegam frescos em qualquer bairro da cidade!",
              "rating": 5
            },
            {
              "id": 3,
              "name": "Roberto",
              "company": "Churrascaria Premium",
              "image": "/images/ifood/testimoniial_3.png",
              "main_quote": "Nossos clientes aumentaram de forma consistente e previsível.",
              "full_quote": "Com as ferramentas do iFood conseguimos entender melhor nossos clientes e personalizar ofertas. O resultado foi um aumento de 140% na receita anual!",
              "rating": 5
            },
            {
              "id": 2,
              "name": "Marina",
              "company": "Sushi & Roll",
              "image": "/images/ifood/testimoniial_2.png",
              "main_quote": "Aumentamos em 180% nossas vendas no primeiro ano.",
              "full_quote": "O iFood abriu portas que não imaginávamos. Começamos com um restaurante pequeno e hoje temos três filiais. A plataforma transformou nosso negócio!",
              "rating": 5
            },
            {
              "id": 5,
              "name": "Lucas",
              "company": "Boteco do Lucas",
              "image": "/images/ifood/testimoniial_5.png",
              "main_quote": "Nosso bar virou referência na região graças ao iFood.",
              "full_quote": "Éramos um bar tradicional com público local. O iFood expandiu nosso alcance para toda a região. Hoje somos o bar mais pedido do bairro!",
              "rating": 5
            },
            {
              "id": 6,
              "name": "Beatriz",
              "company": "Café Aroma",
              "image": "/images/ifood/testimoniial_6.png",
              "main_quote": "Triplicamos a quantidade de pedidos em apenas 6 meses.",
              "full_quote": "O iFood foi fundamental para nossa expansão. Conseguimos alcançar clientes que nunca entrariam na loja física. Nosso faturamento cresceu exponencialmente!",
              "rating": 5
            }
          ]
        }
      },
      {
        "id": "block-faq-001",
        "type": "faq",
        "data": {
          "badge": "FAQ",
          "title": "Ficou com alguma dúvida?",
          "description": "Encontre as respostas para suas principais dúvidas sobre produtos e serviços do iFood.",
          "items": [
            {
              "id": 1,
              "question": "Como funciona a promoção de 4 primeiras mensalidades grátis?",
              "answer": "A promoção oferece 4 meses gratuitos para novos parceiros que se cadastrarem na plataforma. Este benefício é válido para os primeiros 4 meses de operação, sem necessidade de pagamento durante este período."
            },
            {
              "id": 2,
              "question": "O que é o iFood Salão?",
              "answer": "O iFood Salão é a solução de delivery e gerenciamento para restaurantes e estabelecimentos de food service. Ele oferece ferramentas integradas para gerenciar pedidos, cardápio e entrega dos produtos."
            },
            {
              "id": 3,
              "question": "Posso ter uma operação integrada de delivery e Salão com o iFood?",
              "answer": "Sim! O iFood permite integrar tanto o serviço de delivery quanto o de atendimento no local (Salão) em uma única operação, otimizando a gestão do seu negócio."
            },
            {
              "id": 4,
              "question": "Em quanto tempo meu negócio estará disponível no app iFood?",
              "answer": "Após a aprovação do seu cadastro, seu negócio pode estar disponível no app em poucos dias, dependendo do tipo de operação e da documentação necessária."
            },
            {
              "id": 5,
              "question": "Quais as vantagens de utilizar as soluções do iFood Salão?",
              "answer": "As vantagens incluem acesso a milhões de usuários, ferramentas de gestão integradas, suporte especializado, análises e insights sobre seu negócio, além de diversas estratégias de crescimento e visibilidade."
            }
          ]
        }
      },
      {
        "id": "block-footer-001",
        "type": "footer",
        "data": {
          "logo": "/images/ifood/logo_footer.svg",
          "copyright": "© Copyright 2026 - iFood - Todos os direitos reservados iFood com Agência de Restaurantes Online S.A",
          "social_links": [
            { "platform": "facebook", "url": "#", "icon": "/images/ifood/logo-facebook.svg" },
            { "platform": "instagram", "url": "#", "icon": "/images/ifood/logo-instagram.svg" },
            { "platform": "linkedin", "url": "#", "icon": "/images/ifood/logo-linkedin.svg" }
          ],
          "columns": [
            {
              "title": "iFood",
              "badge": null,
              "links": [
                { "label": "Portal do Parceiro", "url": "#" },
                { "label": "Carreiras no iFood", "url": "#" },
                { "label": "Blog para Parceiros", "url": "#" }
              ]
            },
            {
              "title": "Saiba mais",
              "badge": null,
              "links": [
                { "label": "Privacidade", "url": "#" },
                { "label": "Código de conduta", "url": "#" }
              ]
            },
            {
              "title": "Delivery",
              "badge": null,
              "links": [
                { "label": "Plataforma", "url": "#" },
                { "label": "Central de crescimento", "url": "#" },
                { "label": "Logística", "url": "#" },
                { "label": "Gestão de pedidos", "url": "#" }
              ]
            },
            {
              "title": "Salão",
              "badge": "Novo",
              "links": [
                { "label": "Comer fora", "url": "#" },
                { "label": "PDV", "url": "#" },
                { "label": "CRM 360", "url": "#" },
                { "label": "Relatórios e Insights", "url": "#" },
                { "label": "Gestão financeira", "url": "#" }
              ]
            },
            {
              "title": "iFood Ads",
              "badge": null,
              "links": [
                { "label": "Plataforma de anúncios", "url": "#" },
                { "label": "Campanhas premium", "url": "#" },
                { "label": "Analytics para marcas", "url": "#" }
              ]
            },
            {
              "title": "iFood Pago",
              "badge": null,
              "links": [
                { "label": "Conta digital", "url": "#" },
                { "label": "Antecipação", "url": "#" },
                { "label": "Crédito", "url": "#" }
              ]
            }
          ]
        }
      }
    ]
  }'::jsonb,
  'published',
  now()
);

-- Also insert as draft (same content initially)
INSERT INTO page_versions (id, page_id, content, version_type, created_at)
VALUES (
  'a1b2c3d4-0000-4000-8000-000000000001',
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  (SELECT content FROM page_versions WHERE id = 'f1e2d3c4-b5a6-4f7e-8d9c-0b1a2f3e4d5c'),
  'draft',
  now()
);
