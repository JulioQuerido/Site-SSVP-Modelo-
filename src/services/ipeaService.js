const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');
const cheerio = require('cheerio');

const CACHE_FILE = path.join(process.cwd(), 'cache', 'ipea_ficha.json');
const TTL_HOURS = Number(process.env.IPEA_CACHE_TTL_HOURS || 24);
const IPEA_URL = process.env.IPEA_FICHA_URL || 'https://mapaosc.ipea.gov.br/detalhar/844520';

const memoryCache = new NodeCache({ stdTTL: TTL_HOURS * 3600 });
const CACHE_KEY = 'ipea_ficha';

const FALLBACK_DATA = {
  nome: 'Sociedade de São Vicente de Paulo – Conselho Nacional do Brasil',
  cnpj: '34.127.563/0001-67',
  area_atuacao: 'Assistência Social, Desenvolvimento Humano',
  link_ipea: IPEA_URL,
  status: 'fallback',
};

function readFileCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const ageMs = Date.now() - new Date(parsed.cachedAt).getTime();
    if (ageMs > TTL_HOURS * 3600 * 1000) return null;
    return parsed.data;
  } catch (err) {
    return null;
  }
}

function writeFileCache(data) {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ cachedAt: new Date().toISOString(), data }, null, 2));
  } catch (err) {
    console.warn('[ipeaService] Não foi possível gravar cache em disco:', err.message);
  }
}

function extrairDadosHtml(html) {
  const $ = cheerio.load(html);
  const texto = $('body').text().replace(/\s+/g, ' ').trim();

  const cnpjMatch = texto.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);

  return {
    nome: FALLBACK_DATA.nome,
    cnpj: cnpjMatch ? cnpjMatch[0] : FALLBACK_DATA.cnpj,
    area_atuacao: FALLBACK_DATA.area_atuacao,
    link_ipea: IPEA_URL,
    status: 'ipea',
  };
}

async function buscarFichaIpea() {
  const cached = memoryCache.get(CACHE_KEY);
  if (cached) {
    return cached;
  }

  const fileCached = readFileCache();
  if (fileCached) {
    memoryCache.set(CACHE_KEY, fileCached);
    return fileCached;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(IPEA_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`IPEA respondeu com status ${response.status}`);
    }

    const html = await response.text();
    const dados = extrairDadosHtml(html);

    memoryCache.set(CACHE_KEY, dados);
    writeFileCache(dados);
    return dados;
  } catch (err) {
    console.warn('[ipeaService] Falha ao buscar dados do IPEA, usando fallback:', err.message);
    memoryCache.set(CACHE_KEY, FALLBACK_DATA, 300);
    return FALLBACK_DATA;
  }
}

module.exports = { buscarFichaIpea, FALLBACK_DATA };
