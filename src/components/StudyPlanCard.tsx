// src/components/StudyPlanCard.tsx
import React from "react";

export interface CourseCardData {
  title: string;
  university?: string;
  country?: string;
  city?: string;
  description?: string;
  pricePerYear?: string;
  requirements?: string[] | string;
  accommodation?: { needed?: boolean; details?: string } | string;
  visaAndLegal?: string;
  whyThisFits?: string;
}

const StudyPlanCard: React.FC<{ data: CourseCardData }> = ({ data }) => {
  const {
    title,
    university,
    country,
    city,
    description,
    pricePerYear,
    requirements,
    accommodation,
    visaAndLegal,
    whyThisFits,
  } = data;

  const requirementsList =
    Array.isArray(requirements) ? requirements : typeof requirements === "string" && requirements ? [requirements] : [];

  const accommodationText =
    typeof accommodation === "string"
      ? accommodation
      : accommodation && typeof accommodation === "object"
      ? accommodation.details || (accommodation.needed ? "Alojamento necessário" : "Não é necessário")
      : "";

  return (
    <article className="bg-white/85 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-soft transition-shadow hover:shadow-lg">
      <header className="mb-3">
        <h3 className="text-lg font-extrabold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{university} · {city ? `${city}, ` : ""}{country}</p>
      </header>

      <div className="text-sm text-gray-700 mb-4 leading-relaxed">
        <p className="mb-2">{description || "Descrição não disponível."}</p>
        <p className="font-medium">Preço anual: <span className="font-normal">{pricePerYear || "Valor não disponível"}</span></p>
      </div>

      <div className="grid gap-2 text-sm text-gray-700">
        {requirementsList.length > 0 && (
          <div>
            <p className="font-semibold text-gray-800 mb-1">Requisitos:</p>
            <ul className="list-disc list-inside ml-4">
              {requirementsList.map((r, idx) => <li key={idx}>{r}</li>)}
            </ul>
          </div>
        )}

        {accommodationText && (
          <div>
            <p className="font-semibold text-gray-800 mb-1">Alojamento:</p>
            <p>{accommodationText}</p>
          </div>
        )}

        {visaAndLegal && (
          <div>
            <p className="font-semibold text-gray-800 mb-1">Visto & Documentação:</p>
            <p>{visaAndLegal}</p>
          </div>
        )}

        {whyThisFits && (
          <div className="mt-2 bg-blue-50/60 p-3 rounded-lg">
            <p className="font-semibold text-gray-800">Porque se adequa a ti:</p>
            <p className="text-sm text-gray-700">{whyThisFits}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default StudyPlanCard;
