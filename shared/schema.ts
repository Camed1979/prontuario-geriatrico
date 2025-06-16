import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  cidade: text("cidade").notNull(),
  telefone: text("telefone"),
  email: text("email"),
  dataNascimento: text("data_nascimento"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),
  patientId: serial("patient_id").references(() => patients.id).notNull(),
  dataConsulta: timestamp("data_consulta").defaultNow().notNull(),
  
  // Dados do paciente
  dadosPaciente: jsonb("dados_paciente"),
  
  // História clínica
  historiaClinica: jsonb("historia_clinica"),
  
  // Avaliação cognitiva
  avaliacaoCognitiva: jsonb("avaliacao_cognitiva"),
  
  // Vacinação
  vacinacao: jsonb("vacinacao"),
  
  // Sarcopenia
  sarcopenia: jsonb("sarcopenia"),
  
  // Fragilidade
  fragilidade: jsonb("fragilidade"),
  
  // Avaliação nutricional
  avaliacaoNutricional: jsonb("avaliacao_nutricional"),
  
  // Humor e social
  humorSocial: jsonb("humor_social"),
  
  // Rastreamento
  rastreamento: jsonb("rastreamento"),
  
  // Lista de problemas
  listaProblemas: jsonb("lista_problemas"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMedicalRecordSchema = createInsertSchema(medicalRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = typeof patients.$inferSelect;
export type InsertMedicalRecord = z.infer<typeof insertMedicalRecordSchema>;
export type MedicalRecord = typeof medicalRecords.$inferSelect;
