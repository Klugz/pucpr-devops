const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  // Teste 1: status 200 na rota raiz
  it("deve retornar status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  // Teste 2: Content-Type JSON
  it("deve retornar Content-Type application/json", async () => {
    const res = await request(app).get("/");
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  // Teste 3: campo message com valor esperado
  it("deve conter a mensagem correta no corpo", async () => {
    const res = await request(app).get("/");
    expect(res.body.message).toBe("API PUCPR DevOps rodando!");
  });

  // Teste 4: campo timestamp presente e no formato ISO 8601
  it("deve conter timestamp no formato ISO 8601", async () => {
    const res = await request(app).get("/");
    expect(res.body.timestamp).toBeDefined();
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });

  // Teste 5: campo hostname presente e ser uma string
  it("deve conter hostname como string não vazia", async () => {
    const res = await request(app).get("/");
    expect(typeof res.body.hostname).toBe("string");
    expect(res.body.hostname.length).toBeGreaterThan(0);
  });
});

describe("GET /health", () => {
  // Teste 6: rota /health retorna status 200
  it("deve retornar status 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  // Teste 7: rota /health retorna { status: 'ok' }
  it("deve retornar { status: 'ok' }", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /sobre", () => {
  // Teste 8: rota /sobre retorna status 200
  it("deve retornar status 200", async () => {
    const res = await request(app).get("/sobre");
    expect(res.statusCode).toBe(200);
  });

  // Teste 9: rota /sobre retorna os campos esperados
  it("deve retornar os dados do projeto", async () => {
    const res = await request(app).get("/sobre");
    expect(res.body.projeto).toBe("pucpr-devops");
    expect(res.body.disciplina).toBe("DevOps");
    expect(res.body.instituicao).toBe("PUCPR");
    expect(res.body.versao).toBe("1.0.0");
  });
});

describe("Rota inexistente", () => {
  // Teste 10: rota desconhecida retorna 404
  it("deve retornar status 404 para rotas não definidas", async () => {
    const res = await request(app).get("/rota-que-nao-existe");
    expect(res.statusCode).toBe(404);
  });
});
