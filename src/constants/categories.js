export const CATEGORIES = [
  {
    id: 'sacolas',
    name: 'Sacolas',
    slug: 'sacolas',
    parentId: null,
    description: 'Sacolas para todos os tipos de comércio',
    icon: '🛍️',
    image: '/images/categories/sacolas.png',
    order: 1,
    status: 'active',
    children: [
      {
        id: 'sacolas-plasticas',
        name: 'Sacolas Plásticas',
        slug: 'sacolas-plasticas',
        parentId: 'sacolas',
        description: 'Sacolas plásticas resistentes para comércio em geral',
        icon: '🛍️',
        order: 1,
        status: 'active',
        subcategories: ['Camiseta', 'Vazada', 'Fita', 'Alça Rígida', 'Cordão'],
      },
      {
        id: 'sacolas-papel',
        name: 'Sacolas de Papel',
        slug: 'sacolas-papel',
        parentId: 'sacolas',
        description: 'Sacolas de papel kraft e offset para lojas e boutiques',
        icon: '📦',
        order: 2,
        status: 'active',
        subcategories: ['Kraft', 'Offset'],
      },
      {
        id: 'sacolas-tnt',
        name: 'Sacolas TNT',
        slug: 'sacolas-tnt',
        parentId: 'sacolas',
        description: 'Sacolas reutilizáveis de TNT, ecológicas e personalizáveis',
        icon: '♻️',
        order: 3,
        status: 'active',
      },
      {
        id: 'sacolas-biodegradaveis',
        name: 'Sacolas Biodegradáveis',
        slug: 'sacolas-biodegradaveis',
        parentId: 'sacolas',
        description: 'Sacolas biodegradáveis e compostáveis',
        icon: '🌱',
        order: 4,
        status: 'active',
      },
    ],
  },
  {
    id: 'caixas',
    name: 'Caixas',
    slug: 'caixas',
    parentId: null,
    description: 'Caixas de papelão para envio e armazenamento',
    icon: '📦',
    image: '/images/categories/caixas.png',
    order: 2,
    status: 'active',
    children: [
      {
        id: 'caixas-papelao',
        name: 'Caixas de Papelão',
        slug: 'caixas-papelao',
        parentId: 'caixas',
        description: 'Caixas de papelão ondulado para transporte seguro',
        icon: '📦',
        order: 1,
        status: 'active',
      },
      {
        id: 'caixas-ecommerce',
        name: 'Caixas para E-commerce',
        slug: 'caixas-ecommerce',
        parentId: 'caixas',
        description: 'Caixas compactas ideais para envio de produtos vendidos online',
        icon: '📬',
        order: 2,
        status: 'active',
      },
      {
        id: 'caixas-personalizadas',
        name: 'Caixas Personalizadas',
        slug: 'caixas-personalizadas',
        parentId: 'caixas',
        description: 'Caixas com impressão personalizada para sua marca',
        icon: '🎨',
        order: 3,
        status: 'active',
      },
    ],
  },
  {
    id: 'sacos-ecommerce',
    name: 'Sacos E-commerce',
    slug: 'sacos-ecommerce',
    parentId: null,
    description: 'Envelopes e sacos para envio de e-commerce',
    icon: '📮',
    image: '/images/categories/sacos-ecommerce.png',
    order: 3,
    status: 'active',
    children: [
      {
        id: 'envelopes-seguranca',
        name: 'Envelopes de Segurança',
        slug: 'envelopes-seguranca',
        parentId: 'sacos-ecommerce',
        description: 'Envelopes com lacre de segurança inviolável',
        icon: '🔒',
        order: 1,
        status: 'active',
      },
      {
        id: 'sacos-bolha',
        name: 'Sacos com Bolha',
        slug: 'sacos-bolha',
        parentId: 'sacos-ecommerce',
        description: 'Sacos com proteção de plástico bolha interno',
        icon: '💨',
        order: 2,
        status: 'active',
      },
      {
        id: 'sacos-kraft',
        name: 'Sacos Kraft',
        slug: 'sacos-kraft',
        parentId: 'sacos-ecommerce',
        description: 'Sacos de papel kraft para envio sustentável',
        icon: '📜',
        order: 3,
        status: 'active',
      },
    ],
  },
  {
    id: 'fitas',
    name: 'Fitas',
    slug: 'fitas',
    parentId: null,
    description: 'Fitas adesivas e gomadas para lacre e embalagem',
    icon: '🎀',
    image: '/images/categories/fitas.png',
    order: 4,
    status: 'active',
    children: [
      {
        id: 'fitas-gomadas',
        name: 'Fitas Gomadas',
        slug: 'fitas-gomadas',
        parentId: 'fitas',
        description: 'Fitas gomadas com alta adesão para caixas',
        icon: '📎',
        order: 1,
        status: 'active',
      },
      {
        id: 'fitas-adesivas',
        name: 'Fitas Adesivas',
        slug: 'fitas-adesivas',
        parentId: 'fitas',
        description: 'Fitas adesivas transparentes e coloridas',
        icon: '🔗',
        order: 2,
        status: 'active',
      },
      {
        id: 'fitas-personalizadas',
        name: 'Fitas Personalizadas',
        slug: 'fitas-personalizadas',
        parentId: 'fitas',
        description: 'Fitas com impressão da sua marca',
        icon: '🏷️',
        order: 3,
        status: 'active',
      },
    ],
  },
  {
    id: 'complementos',
    name: 'Complementos',
    slug: 'complementos',
    parentId: null,
    description: 'Papel de seda, enchimento, etiquetas e acessórios',
    icon: '✨',
    image: '/images/categories/complementos.png',
    order: 5,
    status: 'active',
    children: [
      {
        id: 'papel-seda',
        name: 'Papel de Seda',
        slug: 'papel-seda',
        parentId: 'complementos',
        description: 'Papel de seda para embrulho e proteção',
        icon: '🧻',
        order: 1,
        status: 'active',
      },
      {
        id: 'enchimento',
        name: 'Enchimento',
        slug: 'enchimento',
        parentId: 'complementos',
        description: 'Flocos de isopor, papel picado e proteção interna',
        icon: '☁️',
        order: 2,
        status: 'active',
      },
      {
        id: 'etiquetas-tags',
        name: 'Etiquetas e Tags',
        slug: 'etiquetas-tags',
        parentId: 'complementos',
        description: 'Etiquetas adesivas e tags decorativas',
        icon: '🏷️',
        order: 3,
        status: 'active',
      },
    ],
  },
];

/**
 * Flatten all categories (parent + children) into a single array
 */
export function getAllCategories() {
  const all = [];
  CATEGORIES.forEach((cat) => {
    all.push({ ...cat, children: undefined });
    if (cat.children) {
      cat.children.forEach((child) => {
        all.push(child);
      });
    }
  });
  return all;
}

/**
 * Find a category by slug
 */
export function getCategoryBySlug(slug) {
  for (const cat of CATEGORIES) {
    if (cat.slug === slug) return cat;
    if (cat.children) {
      for (const child of cat.children) {
        if (child.slug === slug) return child;
      }
    }
  }
  return null;
}
