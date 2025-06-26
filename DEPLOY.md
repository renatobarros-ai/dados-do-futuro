# Deploy na Google Cloud

## Pré-requisitos

1. Google Cloud CLI instalado e configurado
2. Projeto na Google Cloud Platform criado
3. Billing ativado no projeto

## Opção 1: Google App Engine

```bash
# 1. Fazer build da aplicação
npm run build

# 2. Deploy no App Engine
gcloud app deploy

# 3. Visualizar aplicação
gcloud app browse
```

## Opção 2: Google Cloud Run (Recomendado)

```bash
# 1. Configurar variáveis
export PROJECT_ID=seu-project-id
export SERVICE_NAME=dados-do-futuro
export REGION=us-central1

# 2. Build da imagem Docker
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 3. Deploy no Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --port 8080 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production"

# 4. Obter URL da aplicação
gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)'
```

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite as credenciais conforme necessário.

## Monitoramento

- Logs: `gcloud app logs tail -s default` (App Engine) ou Cloud Console
- Métricas: Google Cloud Monitoring
- Alertas: Configure no Cloud Console

## Segurança

- Credenciais não estão mais hardcoded
- Headers de segurança configurados no nginx
- HTTPS forçado
- Arquivos .env protegidos