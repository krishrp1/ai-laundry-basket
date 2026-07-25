-- Speeds up the case-insensitive `contains` search used by every admin list
-- view (lib/data/{customers,orders,quotes,messages}.ts), which otherwise
-- falls back to a sequential scan as these tables grow.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "Customer_name_trgm_idx" ON "Customer" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "Customer_email_trgm_idx" ON "Customer" USING GIN ("email" gin_trgm_ops);
CREATE INDEX "Customer_phone_trgm_idx" ON "Customer" USING GIN ("phone" gin_trgm_ops);

CREATE INDEX "LaundryOrder_orderId_trgm_idx" ON "LaundryOrder" USING GIN ("orderId" gin_trgm_ops);

CREATE INDEX "QuoteRequest_name_trgm_idx" ON "QuoteRequest" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "QuoteRequest_email_trgm_idx" ON "QuoteRequest" USING GIN ("email" gin_trgm_ops);
CREATE INDEX "QuoteRequest_phone_trgm_idx" ON "QuoteRequest" USING GIN ("phone" gin_trgm_ops);
CREATE INDEX "QuoteRequest_requestId_trgm_idx" ON "QuoteRequest" USING GIN ("requestId" gin_trgm_ops);

CREATE INDEX "ContactMessage_name_trgm_idx" ON "ContactMessage" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "ContactMessage_email_trgm_idx" ON "ContactMessage" USING GIN ("email" gin_trgm_ops);
CREATE INDEX "ContactMessage_message_trgm_idx" ON "ContactMessage" USING GIN ("message" gin_trgm_ops);
