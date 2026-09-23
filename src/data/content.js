// Technical English course content — structured lessons, vocabulary, grammar, conversations and exercises
// organized by interest area (Cine, Tecnología, Viajes, Vida cotidiana, Proyectos).

export const AREAS = [
  { id: "cine", name: "Cine", icon: "🎬", description: "Películas, series, actores y conversaciones sobre entretenimiento." },
  { id: "tecnologia", name: "Tecnología", icon: "💻", description: "Software, apps, inteligencia artificial y comunicación profesional en tecnología." },
  { id: "viajes", name: "Viajes", icon: "✈️", description: "Aeropuertos, hoteles, reservaciones, direcciones y situaciones de viaje." },
  { id: "vidacotidiana", name: "Vida cotidiana", icon: "🏠", description: "Familia, rutinas, compras, salud y conversaciones informales del día a día." },
  { id: "proyectos", name: "Proyectos", icon: "📁", description: "Contenido técnico y laboral basado en documentos y proyectos reales de trabajo.", isProjectArea: true }
];

// Sub-classification within the "Proyectos" area — projects can hold their own documents,
// vocabulary and lessons. Add more entries here as new source material is provided.
export const PROJECTS = [
  { id: "core-project", name: "Proyecto base", description: "Incidentes, Jira, información técnica, resultados de pruebas, proveedores y reuniones." }
];

export const UNITS = [
  {
    id: "proyectos-1",
    area: "proyectos",
    projectId: "core-project",
    title: "Reporting an Incident and Following Up",
    subtitle: "Reportar un incidente, explicar impacto, pedir información y dar seguimiento a un Jira",
    level: "Inicial → Intermedio laboral",
    grammarFocus: ["Present Simple", "Present Continuous"],
    recycled: [],
    newVocab: [
      { en: "issue", es: "problema / incidencia", example: "We have an issue with the transaction." },
      { en: "incident", es: "incidente", example: "The incident was reported yesterday." },
      { en: "investigate", es: "investigar", example: "We are investigating the issue." },
      { en: "root cause", es: "causa raíz", example: "We need to find the root cause." },
      { en: "impact", es: "impacto", example: "We need to understand the impact." },
      { en: "under analysis", es: "en análisis", example: "The issue is under analysis." },
      { en: "update", es: "actualización / avance", example: "We will provide an update." },
      { en: "evidence", es: "evidencia", example: "Please provide the evidence." },
      { en: "logs", es: "registros / logs", example: "We are reviewing the logs." },
      { en: "expected", es: "esperado", example: "The result is not as expected." }
    ],
    corePhrases: [
      { en: "We have an issue with...", use: "Reportar un problema" },
      { en: "We are investigating the issue.", use: "Indicar una investigación en curso" },
      { en: "The issue is under analysis.", use: "Indicar estado" },
      { en: "What is the impact?", use: "Preguntar por impacto" },
      { en: "Could you please provide...?", use: "Solicitar información" },
      { en: "Do we have an update on...?", use: "Dar seguimiento" },
      { en: "What is the next step?", use: "Preguntar por próximo paso" },
      { en: "Please keep me updated.", use: "Pedir seguimiento" },
      { en: "We need to identify the root cause.", use: "Hablar de causa raíz" }
    ],
    grammarPoints: [
      {
        title: "We are + verb-ing",
        explanation: "Se usa para decir qué está ocurriendo ahora (present continuous).",
        pattern: "We are + verb-ing + object",
        examples: ["We are investigating the issue. → Estamos investigando la incidencia.", "We are reviewing the logs. → Estamos revisando los logs."]
      },
      {
        title: "The issue is + status",
        explanation: "Present simple con 'be' para describir un estado.",
        pattern: "The issue is + adjective/status",
        examples: ["The issue is under analysis. → La incidencia está en análisis.", "The issue is still open. → La incidencia todavía está abierta."]
      },
      {
        title: "Could you please...?",
        explanation: "Forma profesional y amable de solicitar información.",
        pattern: "Could you please + verb...?",
        examples: ["Could you please provide more details?", "Could you please check the logs?"]
      },
      {
        title: "We need to...",
        explanation: "Se usa para expresar una acción necesaria.",
        pattern: "We need to + verb",
        examples: ["We need to identify the root cause."]
      }
    ],
    readings: [
      {
        title: "Incident Report — Transaction Processing Issue",
        text: "The support team reported an issue affecting transaction processing. Some transactions are not being processed as expected. The development team started an investigation to identify the root cause. At this stage, the team is reviewing application logs and transaction data. The issue is currently under analysis, and additional information is required to continue the investigation. The team will provide an update once more details are available.",
        summaryEs: "El equipo reportó un problema en el procesamiento de transacciones; desarrollo está investigando, revisando logs y datos, y dará una actualización cuando tenga más información.",
        questions: ["What is the issue about?", "Who started the investigation?", "What is the team reviewing?", "What is required to continue?"]
      }
    ],
    conversations: [
      {
        title: "Scenario 1 — Reporting an Incident",
        lines: [
          { speaker: "Carlos", text: "Hi team. We have an issue with transaction processing." },
          { speaker: "Ana", text: "What is the impact?" },
          { speaker: "Carlos", text: "Some transactions are not being processed as expected." },
          { speaker: "Ana", text: "When did the issue start?" },
          { speaker: "Carlos", text: "It started this morning. We are reviewing the application logs." },
          { speaker: "Ana", text: "Do you have any evidence so far?" },
          { speaker: "Carlos", text: "Not yet. We are still investigating the root cause." },
          { speaker: "Ana", text: "Okay. Please keep us updated." },
          { speaker: "Carlos", text: "Sure. I will provide an update as soon as we have more information." }
        ]
      },
      {
        title: "Scenario 2 — Following Up on a Jira",
        lines: [
          { speaker: "Carlos", text: "Hi team. Do we have an update on TCK-4521?" },
          { speaker: "Mark", text: "Yes. The story is still under analysis." },
          { speaker: "Carlos", text: "What is blocking the progress?" },
          { speaker: "Mark", text: "We need additional information from the functional team." },
          { speaker: "Carlos", text: "Do you have an estimated date for the next step?" },
          { speaker: "Mark", text: "We expect to complete the analysis tomorrow." },
          { speaker: "Carlos", text: "Great. Please let me know if anything changes." },
          { speaker: "Mark", text: "Sure. I will keep you posted." }
        ]
      },
      {
        title: "Scenario 3 — Technical Information Request",
        lines: [
          { speaker: "Developer", text: "Could you please send me the logs from the affected transaction?" },
          { speaker: "Support", text: "Sure. Which time range do you need?" },
          { speaker: "Developer", text: "From 10:00 AM to 11:00 AM, please." },
          { speaker: "Support", text: "Do you also need the transaction ID?" },
          { speaker: "Developer", text: "Yes, please. That will help us identify the root cause." },
          { speaker: "Support", text: "I will send the information shortly." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Exercise A — Complete the sentences",
        bank: ["issue", "update", "logs", "root cause", "analysis"],
        items: [
          { text: "We have an ___ with transaction processing.", answer: "issue" },
          { text: "The issue is still under ___.", answer: "analysis" },
          { text: "We are reviewing the application ___.", answer: "logs" },
          { text: "We need to identify the ___.", answer: "root cause" },
          { text: "We will provide an ___ tomorrow.", answer: "update" }
        ]
      },
      {
        type: "translate",
        title: "Exercise B — Translate into English",
        items: [
          { text: "Estamos investigando la incidencia.", answer: "We are investigating the issue." },
          { text: "¿Tenemos alguna actualización sobre el Jira?", answer: "Do we have an update on the Jira?" },
          { text: "Necesitamos identificar la causa raíz.", answer: "We need to identify the root cause." },
          { text: "¿Podrías revisar los logs, por favor?", answer: "Could you please check the logs?" },
          { text: "La incidencia todavía está en análisis.", answer: "The issue is still under analysis." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the best sentence",
        items: [
          { text: "1", options: ["We investigating the issue.", "We are investigating the issue."], answer: 1 },
          { text: "2", options: ["Could you please check the logs?", "Could you check please the logs?"], answer: 0 },
          { text: "3", options: ["The issue is under analysis.", "The issue under analysis is."], answer: 0 },
          { text: "4", options: ["We need identify the root cause.", "We need to identify the root cause."], answer: 1 },
          { text: "5", options: ["Do we have an update on the Jira?", "Have we an update on the Jira?"], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "proyectos-2",
    area: "proyectos",
    projectId: "core-project",
    title: "Updating a Jira Ticket",
    subtitle: "Comunicar avances, trabajo completado, bloqueos, dependencias y próximos pasos",
    level: "A2+ hacia B1 laboral",
    grammarFocus: ["Past Simple", "Present Perfect (básico)"],
    recycled: ["issue", "blocked", "validation", "evidence", "workaround", "next step"],
    newVocab: [
      { en: "ticket / issue", es: "incidencia, historia o tarea", example: "The ticket is ready for review." },
      { en: "in progress", es: "en curso", example: "The integration task is in progress." },
      { en: "ready for QA", es: "lista para QA", example: "The change is ready for QA." },
      { en: "pending", es: "pendiente", example: "The field definition is still pending." },
      { en: "blocked by", es: "bloqueado por", example: "Testing is blocked by a missing service." },
      { en: "dependency", es: "dependencia", example: "This service is a project dependency." },
      { en: "assigned to", es: "asignado a", example: "The validation is assigned to the integration team." },
      { en: "due date", es: "fecha de vencimiento", example: "The due date needs to be confirmed." },
      { en: "scope", es: "alcance", example: "This change is outside the current scope." },
      { en: "comment", es: "comentario", example: "I added a comment to the ticket." },
      { en: "linked issue", es: "incidencia vinculada", example: "The defect is linked to the story." },
      { en: "remaining work", es: "trabajo restante", example: "The remaining work is the regression test." },
      { en: "target date", es: "fecha objetivo", example: "The target date is under review." }
    ],
    corePhrases: [
      { en: "The ticket is currently in progress.", use: "Indicar estado actual" },
      { en: "We have completed the initial...", use: "Resumir un resultado logrado" },
      { en: "However, ... is still pending.", use: "Introducir un pendiente que limita el avance" },
      { en: "The ticket is not fully blocked because...", use: "Explicar con precisión el grado del bloqueo" },
      { en: "The next step is to...", use: "Presentar una acción inmediata" },
      { en: "Can you give us an update on...?", use: "Pedir seguimiento" },
      { en: "Is anything blocking the task?", use: "Preguntar por bloqueos" },
      { en: "Once we receive..., we will...", use: "Coordinar una acción futura" }
    ],
    grammarPoints: [
      {
        title: "Past Simple — acción terminada + momento definido",
        explanation: "Usa el pasado simple cuando dices cuándo ocurrió la acción (yesterday, last week, on Monday...).",
        pattern: "Subject + verb-ed (or irregular past)",
        examples: ["We completed the mapping yesterday.", "The supplier sent the file on Monday.", "QA reported the defect during the last test cycle."]
      },
      {
        title: "Present Perfect — resultado relevante ahora",
        explanation: "have/has + past participle. Úsalo para comunicar progreso o experiencia reciente sin centrarte en un momento específico (already, yet, so far, recently, just).",
        pattern: "Subject + have/has + past participle",
        examples: ["We have completed the initial mapping.", "QA has reported a new defect.", "The team has not received the final definition yet."]
      },
      {
        title: "Once + present simple, will + verb",
        explanation: "Patrón para coordinar una acción futura condicionada a otra.",
        pattern: "Once + present simple, ... will + verb",
        examples: ["Once QA confirms the result, we will close the ticket."]
      }
    ],
    readings: [
      {
        title: "Satellite application integration update",
        text: "The team is adapting a satellite application for a migration from the legacy system to the new platform. The ticket is currently in progress. The developers have reviewed the interface specification and completed the initial file mapping. They also met with the integration team last week to clarify the source and target fields. The team is now validating the output file. However, one field definition is still pending, and QA cannot start the complete test cycle until that information is confirmed. The ticket is not fully blocked because the developers can continue documenting the mapping and preparing test data. The next step is to receive the final field definition, update the transformation rule, and generate a new file for QA. The team has attached the current mapping and test evidence to the Jira ticket.",
        summaryEs: "El equipo migra una aplicación satélite del sistema anterior a la nueva plataforma. El mapeo inicial está completo; falta confirmar un campo antes de que QA pueda probar todo el ciclo, pero el trabajo de documentación puede continuar.",
        questions: ["What is the current status of the ticket?", "What has the team completed?", "What information is still pending?", "Why is the ticket not fully blocked?", "What are the next three actions?"]
      }
    ],
    conversations: [
      {
        title: "Follow-up conversation",
        lines: [
          { speaker: "Project lead", text: "Can you give us an update on the interface ticket?" },
          { speaker: "Developer", text: "Sure. The ticket is in progress. We have completed the initial mapping and attached it to Jira." },
          { speaker: "Project lead", text: "What are you working on now?" },
          { speaker: "Developer", text: "We are validating the output file and preparing the QA data." },
          { speaker: "Project lead", text: "Is anything blocking the task?" },
          { speaker: "Developer", text: "One field definition is still pending. We can continue with the documentation, but QA cannot complete the full test cycle yet." },
          { speaker: "Project lead", text: "Who needs to confirm the definition?" },
          { speaker: "Developer", text: "The source-system team needs to confirm the expected value and format." },
          { speaker: "Project lead", text: "What is the next step?" },
          { speaker: "Developer", text: "Once we receive the definition, we will update the transformation rule, generate a new file, and notify QA." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete with the correct form",
        items: [
          { text: "We ___ the ticket yesterday. (update)", answer: "updated" },
          { text: "We have already ___ the mapping. (complete)", answer: "completed" },
          { text: "QA has not ___ the evidence yet. (receive)", answer: "received" },
          { text: "The supplier ___ the file on Monday. (send)", answer: "sent" },
          { text: "The team has ___ a new dependency. (identify)", answer: "identified" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "La tarea está en curso.", answer: "The task is in progress." },
          { text: "Ya completamos el mapeo inicial.", answer: "We have already completed the initial mapping." },
          { text: "Todavía no hemos recibido la definición final.", answer: "We have not received the final definition yet." },
          { text: "QA reportó el defecto ayer.", answer: "QA reported the defect yesterday." },
          { text: "Una vez recibamos la información, generaremos un nuevo archivo.", answer: "Once we receive the information, we will generate a new file." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct expression",
        items: [
          { text: "The task is ___ by a missing definition.", options: ["blocked", "broken"], answer: 0 },
          { text: "We are ___ the confirmation.", options: ["waiting for", "waiting"], answer: 0 },
          { text: "The evidence is attached ___ the ticket.", options: ["in", "to"], answer: 1 },
          { text: "Once we receive it, we ___ the rule.", options: ["update", "will update"], answer: 1 }
        ]
      }
    ]
  },

  {
    id: "proyectos-3",
    area: "proyectos",
    projectId: "core-project",
    title: "Asking for Technical Information",
    subtitle: "Solicitar y confirmar información sobre campos, tablas, archivos, servicios, formatos y reglas de negocio",
    level: "A2+ hacia B1 laboral",
    grammarFocus: ["Questions", "Polite requests"],
    recycled: ["issue", "validation", "evidence", "pending", "dependency", "expected value", "next step"],
    newVocab: [
      { en: "source system", es: "sistema origen", example: "What is the source system?" },
      { en: "target field", es: "campo destino", example: "Which target field should receive this value?" },
      { en: "data type", es: "tipo de dato", example: "What is the expected data type?" },
      { en: "field length", es: "longitud", example: "What is the maximum field length?" },
      { en: "mandatory / optional", es: "obligatorio / opcional", example: "Is this field mandatory?" },
      { en: "default value", es: "valor predeterminado", example: "Should we send a default value?" },
      { en: "sample record", es: "registro de ejemplo", example: "Could you share a sample record?" },
      { en: "file layout", es: "estructura del archivo", example: "Do we have the latest file layout?" },
      { en: "delimiter / encoding", es: "delimitador / codificación", example: "Which delimiter and encoding are expected?" },
      { en: "endpoint", es: "punto de acceso", example: "Which endpoint should QA call?" },
      { en: "request / response", es: "solicitud / respuesta", example: "Could you confirm the response structure?" },
      { en: "business rule", es: "regla de negocio", example: "Which rule applies here?" }
    ],
    corePhrases: [
      { en: "Which field are you referring to?", use: "Delimitar la consulta" },
      { en: "Could you also confirm...?", use: "Agregar una petición relacionada" },
      { en: "Just to confirm...", use: "Verificar una interpretación" },
      { en: "...or...?", use: "Presentar alternativas concretas" },
      { en: "Could you provide a sample value?", use: "Reducir ambigüedad" }
    ],
    grammarPoints: [
      {
        title: "Preguntas con be",
        explanation: "be + subject + complement?",
        pattern: "Is/Are + subject + ...?",
        examples: ["Is the field mandatory?", "Are these values available in the system?", "Where is the specification?"]
      },
      {
        title: "Preguntas con do / does",
        explanation: "do/does + subject + verbo base?",
        pattern: "Do/Does + subject + verb...?",
        examples: ["Does the service return the product code?", "Do we need to send empty fields?", "Which format does the interface use?"]
      },
      {
        title: "Preguntas con can / could / would",
        explanation: "Can you...? es directo. Could you...? es cortés. Would you clarify...? es más formal.",
        pattern: "Can/Could/Would + you + verb...?",
        examples: ["Can you confirm...?", "Could you provide...?", "Would you clarify...?"]
      },
      {
        title: "Orden de las preguntas",
        explanation: "question word + auxiliary + subject + main verb.",
        pattern: "Wh- + aux + subject + verb?",
        examples: ["Which format does the service return?"]
      }
    ],
    readings: [
      {
        title: "Clarifying a field for a satellite application",
        text: "A satellite application is being adapted to consume data from the new platform instead of the legacy system. The initial mapping is complete, but the team still needs to identify the field that indicates whether a record was migrated from the legacy platform. Before changing the application, the developer sends a clarification request. He asks which target field contains the indicator, what values the field can return, and whether the field is mandatory. He also requests two sample records: one migrated record and one record created directly in the new platform. The developer does not assume that an empty value means \"not migrated\". He asks the data team to confirm the rule and the expected behaviour when the value is missing. Once the definition is confirmed, the team will update the mapping, create test cases, and attach the evidence to Jira.",
        summaryEs: "El desarrollador necesita identificar el campo que indica si un registro fue migrado. Pide el campo, valores válidos, obligatoriedad y dos muestras, sin asumir que un valor vacío significa 'no migrado'.",
        questions: ["Why does the team need an additional field definition?", "What three details does the developer ask about?", "Why does he request two sample records?", "What assumption does he avoid?"]
      }
    ],
    conversations: [
      {
        title: "Technical clarification",
        lines: [
          { speaker: "Developer", text: "Hi. I need to clarify one field for the satellite-application mapping." },
          { speaker: "Platform specialist", text: "Sure. Which field are you referring to?" },
          { speaker: "Developer", text: "We need an indicator to identify records migrated from the legacy system. Which target field should we use?" },
          { speaker: "Specialist", text: "Let me check the current data model." },
          { speaker: "Developer", text: "Could you also confirm the data type and the valid values?" },
          { speaker: "Specialist", text: "Yes. Do you need sample data as well?" },
          { speaker: "Developer", text: "Yes, please. Could you provide one migrated record and one record created directly in the new platform?" },
          { speaker: "Specialist", text: "Certainly. I will attach them to the ticket." },
          { speaker: "Developer", text: "Just to confirm, should an empty value be treated as \"not migrated\", or should it be rejected?" },
          { speaker: "Specialist", text: "That rule still needs confirmation from the data team." }
        ]
      }
    ],
    exercises: [
      {
        type: "order",
        title: "Order the words",
        items: [
          { text: "field / which / use / should / we", answer: "which field should we use" },
          { text: "does / return / service / what / the", answer: "what does the service return" },
          { text: "mandatory / is / field / this", answer: "is this field mandatory" },
          { text: "provide / could / sample / you / a / response", answer: "could you provide a sample response" },
          { text: "happen / value / if / should / what / missing / is / the", answer: "what should happen if the value is missing" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "¿Qué campo del sistema debemos utilizar?", answer: "Which field of the system should we use?" },
          { text: "¿Podrían confirmar el tipo y la longitud?", answer: "Could you confirm the type and the length?" },
          { text: "¿El campo es obligatorio u opcional?", answer: "Is the field mandatory or optional?" },
          { text: "¿Qué debe ocurrir si falta el valor?", answer: "What should happen if the value is missing?" },
          { text: "Una vez confirmemos la regla, actualizaremos el mapeo.", answer: "Once we confirm the rule, we will update the mapping." }
        ]
      },
      {
        type: "fill-blank",
        title: "Complete with the correct question word",
        bank: ["Which", "What", "When", "Who", "How"],
        items: [
          { text: "___ table contains the contract status?", answer: "Which" },
          { text: "___ value should we send when the field is empty?", answer: "What" },
          { text: "___ is the file generated?", answer: "When" },
          { text: "___ team needs to confirm the rule?", answer: "Who" },
          { text: "___ is the product code calculated?", answer: "How" }
        ]
      }
    ]
  },

  {
    id: "proyectos-4",
    area: "proyectos",
    projectId: "core-project",
    title: "Explaining Test Results",
    subtitle: "Explicar resultados esperados y obtenidos, documentar evidencias y comunicar defectos",
    level: "A2+ hacia B1 laboral",
    grammarFocus: ["Comparatives", "Cause / effect"],
    recycled: ["issue", "validation", "evidence", "pending", "sample record", "business rule"],
    newVocab: [
      { en: "test case", es: "caso de prueba", example: "We executed the test case." },
      { en: "expected result", es: "resultado esperado", example: "The expected result was a successful response." },
      { en: "actual result", es: "resultado obtenido", example: "The actual result was an error." },
      { en: "passed / failed", es: "aprobó / falló", example: "The validation failed." },
      { en: "reproducible", es: "reproducible", example: "The issue is reproducible." },
      { en: "log file", es: "archivo de log", example: "The log contains the response code." },
      { en: "severity", es: "severidad", example: "The defect has high severity." },
      { en: "root cause", es: "causa raíz", example: "The root cause is under investigation." },
      { en: "fix / retest", es: "corrección / reprueba", example: "QA will retest the fix." }
    ],
    corePhrases: [
      { en: "What happened instead?", use: "Preguntar por el resultado real" },
      { en: "The issue is reproducible.", use: "Confirmar que se repite" },
      { en: "The cause is under investigation.", use: "Indicar hipótesis pendiente" },
      { en: "The scenario cannot be approved yet.", use: "Comunicar bloqueo de aprobación" },
      { en: "QA will retest the corrected version.", use: "Indicar próximo paso" }
    ],
    grammarPoints: [
      {
        title: "Expected vs. actual",
        explanation: "Contrasta lo esperado con lo observado usando 'however'.",
        pattern: "The expected result was that... However, the actual result was that...",
        examples: ["The expected result was that the service returned a successful response. However, the actual result was that the service returned an error."]
      },
      {
        title: "Should have + participle",
        explanation: "Para expresar lo que debía haber ocurrido pero no ocurrió.",
        pattern: "Subject + should have + past participle",
        examples: ["The payment status should have been updated.", "The file should have contained the approved records."]
      },
      {
        title: "Causa y contraste",
        explanation: "because (causa), however (contraste), therefore (consecuencia).",
        pattern: "..., because / however / therefore ...",
        examples: ["The test failed because the response was invalid.", "The service responded; however, the status remained unchanged.", "The output was empty; therefore, QA could not continue."]
      }
    ],
    readings: [
      {
        title: "Payment service validation",
        text: "The QA team executed a payment-service scenario in the certification environment. The expected result was that the service returned a successful response and updated the payment status. However, the service returned an error message, and the payment status remained unchanged. The team reviewed the logs and reproduced the issue three times using the same test data. Screenshots, request and response details, and relevant log entries were attached to Jira. The defect affects payment validation, so the end-to-end scenario cannot be approved yet. The root cause has not been confirmed. Development will review the evidence and provide its findings. QA will then retest the scenario and update Jira.",
        summaryEs: "QA ejecutó una prueba de pago; el resultado esperado no ocurrió (hubo error), el problema se reprodujo tres veces y se documentó, pero la causa raíz aún no está confirmada.",
        questions: ["What was the expected result?", "What was the actual result?", "How many times was the issue reproduced?", "Has the root cause been confirmed?", "What will QA do next?"]
      }
    ],
    conversations: [
      {
        title: "Reporting a failed test",
        lines: [
          { speaker: "Lead", text: "Did the payment test pass?" },
          { speaker: "QA", text: "No. It failed during response validation." },
          { speaker: "Lead", text: "What was the expected result?" },
          { speaker: "QA", text: "The service should have returned success and updated the status." },
          { speaker: "Lead", text: "What happened instead?" },
          { speaker: "QA", text: "It returned an error, and the status remained unchanged." },
          { speaker: "Lead", text: "Can you reproduce it?" },
          { speaker: "QA", text: "Yes. We reproduced it three times." },
          { speaker: "Lead", text: "What is the impact?" },
          { speaker: "QA", text: "End-to-end validation cannot be completed." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["attached", "reproduced", "result", "retest", "returned"],
        items: [
          { text: "The expected ___ was a successful response.", answer: "result" },
          { text: "The service ___ an error message.", answer: "returned" },
          { text: "We ___ the issue three times.", answer: "reproduced" },
          { text: "The evidence has been ___ to Jira.", answer: "attached" },
          { text: "QA will ___ the corrected version.", answer: "retest" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "La prueba falló.", answer: "The test failed." },
          { text: "El estado debió actualizarse.", answer: "The status should have been updated." },
          { text: "El problema es reproducible.", answer: "The issue is reproducible." },
          { text: "La causa raíz todavía no ha sido confirmada.", answer: "The root cause has not been confirmed yet." },
          { text: "QA repetirá la prueba después de la corrección.", answer: "QA will retest after the fix." }
        ]
      },
      {
        type: "mcq",
        title: "Correct the sentence",
        items: [
          { text: "1", options: ["The test was fail.", "The test failed."], answer: 1 },
          { text: "2", options: ["The service should returned success.", "The service should have returned success."], answer: 1 },
          { text: "3", options: ["We have reproduced it yesterday.", "We reproduced it yesterday."], answer: 1 },
          { text: "4", options: ["The evidences are attach.", "The evidence is attached."], answer: 1 }
        ]
      }
    ]
  },

  {
    id: "proyectos-5",
    area: "proyectos",
    projectId: "core-project",
    title: "Following Up with Vendors",
    subtitle: "Seguimiento profesional con proveedores: incidencias, compromisos, fechas objetivo, correcciones y escalación",
    level: "B1 laboral inicial",
    grammarFocus: ["Polite modals", "Conditionals", "Indirect questions"],
    recycled: ["issue", "impact", "evidence", "root cause", "fix", "retest", "next step"],
    newVocab: [
      { en: "follow-up", es: "seguimiento", example: "This is a follow-up on the open issue." },
      { en: "pending response", es: "respuesta pendiente", example: "Your technical response is still pending." },
      { en: "owner / ownership", es: "responsable / responsabilidad", example: "Could you confirm the owner?" },
      { en: "target date / ETA", es: "fecha objetivo / estimada", example: "Could you provide an ETA?" },
      { en: "commitment", es: "compromiso", example: "Please confirm the agreed commitment." },
      { en: "finding", es: "hallazgo", example: "Could you share your findings?" },
      { en: "root-cause analysis", es: "análisis de causa raíz", example: "The RCA is still pending." },
      { en: "corrected delivery", es: "entrega corregida", example: "When will the corrected delivery be available?" },
      { en: "retest window", es: "ventana de reprueba", example: "QA needs to reserve a retest window." },
      { en: "overdue", es: "vencido", example: "The agreed action is now overdue." },
      { en: "escalation", es: "escalación", example: "The issue requires escalation." },
      { en: "closure criteria", es: "criterios de cierre", example: "Please confirm the closure criteria." }
    ],
    corePhrases: [
      { en: "Just following up on the request below. Could you share an update?", use: "Recordatorio cordial" },
      { en: "We have not received the agreed update. Please confirm the owner and target date.", use: "Seguimiento firme" },
      { en: "This issue is blocking certification and requires priority attention.", use: "Escalación urgente" },
      { en: "Could you confirm when the fix will be available?", use: "Pregunta indirecta cortés" },
      { en: "If the issue cannot be resolved, please propose a safe workaround.", use: "Pedir alternativa" }
    ],
    grammarPoints: [
      {
        title: "Can, could, would",
        explanation: "Can you...? (directo/neutral). Could you...? (cortés/estándar). Would you be able to...? (más diplomático).",
        pattern: "Can/Could/Would you (be able to) + verb...?",
        examples: ["Can you confirm the ticket owner?", "Could you share your findings?", "Would you be able to provide an update today?"]
      },
      {
        title: "Preguntas indirectas",
        explanation: "Útiles cuando el asunto es sensible o urgente. Se introducen con 'Could you confirm/clarify...' + orden afirmativo.",
        pattern: "Could you confirm/clarify + when/why/whether + subject + verb...?",
        examples: ["Directa: When will the fix be available? → Indirecta: Could you confirm when the fix will be available?", "Directa: Why did the delivery fail? → Indirecta: Could you clarify why the delivery failed?"]
      },
      {
        title: "Condicional para coordinar",
        explanation: "If / Once + present simple, ... will/can + verb.",
        pattern: "If/Once + present simple, subject + will/can + verb",
        examples: ["If the corrected package is available today, QA can retest tomorrow.", "Once we receive your confirmation, we will reserve the testing window."]
      }
    ],
    readings: [
      {
        title: "Follow-up on a vendor delivery issue",
        text: "QA reported that a test script failed after the latest vendor delivery. The error is reproducible, and the requested logs, screenshots, test data, and Jira reference have already been shared with the vendor. During the initial review, the vendor confirmed that the script requires further internal analysis. The ticket remains open because the corrected version and the root-cause explanation have not been provided yet. Meanwhile, other scenarios can continue, but the affected certification case cannot be completed. The project team sends a structured follow-up. It asks the vendor to confirm ownership, current findings, the expected delivery date, and whether a safe workaround exists. The message also explains that QA needs advance notice to schedule the retest window. If the target date is at risk, the vendor is asked to provide a recovery plan and identify any additional information required from the bank.",
        summaryEs: "QA reportó un script fallido; se compartió toda la evidencia con el proveedor pero el análisis y la fecha siguen pendientes. El equipo envía un seguimiento estructurado pidiendo dueño, hallazgos, fecha y alternativa.",
        questions: ["What has QA already shared?", "Why does the ticket remain open?", "Which four items does the follow-up request?", "What should happen if the target date is at risk?"]
      }
    ],
    conversations: [
      {
        title: "Follow-up with the vendor",
        lines: [
          { speaker: "Bank engineer", text: "Good morning. I would like to follow up on the script issue reported in Jira." },
          { speaker: "Vendor specialist", text: "Good morning. We are still investigating it internally." },
          { speaker: "Bank engineer", text: "Thank you. Could you share the current findings and confirm who owns the analysis?" },
          { speaker: "Vendor specialist", text: "The product team owns it. We believe the issue is limited to this scenario, but that is not confirmed yet." },
          { speaker: "Bank engineer", text: "Could you confirm when we can expect the analysis and a corrected version?" },
          { speaker: "Vendor specialist", text: "I need to validate the target date with the product team." },
          { speaker: "Bank engineer", text: "Please let us know once the date is confirmed. This case is preventing completion of one certification scenario." },
          { speaker: "Vendor specialist", text: "Understood. I will update the ticket with the owner, findings, and target date." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["ETA", "follow-up", "owner", "retest", "yet"],
        items: [
          { text: "This is a ___ on the open issue.", answer: "follow-up" },
          { text: "Could you confirm the ___ of the analysis?", answer: "owner" },
          { text: "We have not received the root-cause analysis ___.", answer: "yet" },
          { text: "Please provide an ___ for the corrected delivery.", answer: "ETA" },
          { text: "QA needs to schedule the ___ window.", answer: "retest" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "Aún no hemos recibido la actualización técnica.", answer: "We have not received the technical update yet." },
          { text: "¿Podrían confirmar el responsable y la fecha objetivo?", answer: "Could you confirm the owner and the target date?" },
          { text: "Las evidencias solicitadas ya fueron adjuntadas.", answer: "The requested evidence has already been attached." },
          { text: "Esta dependencia está afectando el plan de certificación.", answer: "This dependency is affecting the certification plan." },
          { text: "Si la fecha está en riesgo, favor compartir un plan de recuperación.", answer: "If the target date is at risk, please share a recovery plan." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the professional tone",
        items: [
          { text: "Too direct: \"Why have you not fixed it?\"", options: ["This is your fault.", "Could you clarify the current status of the fix?"], answer: 1 },
          { text: "Too direct: \"Send the delivery today.\"", options: ["Would you be able to confirm the delivery date?", "Fix this ASAP."], answer: 0 },
          { text: "Too direct: \"This delay is your fault.\"", options: ["You never answer.", "The pending action is affecting the agreed timeline."], answer: 1 },
          { text: "Too direct: \"Answer now.\"", options: ["Please provide an update at your earliest convenience.", "You are delaying the project."], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "proyectos-6",
    area: "proyectos",
    projectId: "core-project",
    title: "Technical Meeting Participation",
    subtitle: "Participar en reuniones técnicas: aclarar, interrumpir con cortesía, comparar opciones y cerrar con acciones",
    level: "B1 laboral inicial",
    grammarFocus: ["Modals", "Diplomatic disagreement", "Meeting discourse markers"],
    recycled: ["status", "blocker", "dependency", "owner", "evidence", "ETA", "next step"],
    newVocab: [
      { en: "agenda item", es: "punto de agenda", example: "Let us move to the next agenda item." },
      { en: "open point", es: "punto abierto", example: "One open point remains." },
      { en: "blocker", es: "bloqueante", example: "The current blocker is the missing service." },
      { en: "assumption", es: "supuesto", example: "We need to validate that assumption." },
      { en: "concern", es: "preocupación", example: "My main concern is the testing window." },
      { en: "proposal", es: "propuesta", example: "Our proposal is to run a controlled test." },
      { en: "trade-off", es: "compensación", example: "The trade-off is speed versus rework." },
      { en: "action item", es: "acción acordada", example: "Let us capture that as an action item." },
      { en: "target date", es: "fecha objetivo", example: "Can we agree on a target date?" },
      { en: "recap", es: "resumen final", example: "I will recap the agreed actions." }
    ],
    corePhrases: [
      { en: "Let me give a quick update.", use: "Abrir una intervención" },
      { en: "Could you clarify what you mean by...?", use: "Pedir aclaración" },
      { en: "Sorry to interrupt, but may I clarify one point?", use: "Interrumpir con cortesía" },
      { en: "I agree with the objective, but I have a concern about timing.", use: "Acuerdo parcial" },
      { en: "Let me recap the decisions and actions.", use: "Cerrar la reunión" }
    ],
    grammarPoints: [
      {
        title: "Método P-A-C-E",
        explanation: "Point (mensaje principal) → Analysis (evidencia) → Consequence (impacto) → Expectation (acción necesaria). Estructura para hablar con claridad en 20-45 segundos.",
        pattern: "Point. Analysis. Consequence. Expectation.",
        examples: ["The mapping is complete, but the migration indicator is still pending. This prevents QA from validating both record types. We need the valid values and samples before the next test."]
      },
      {
        title: "Signposting",
        explanation: "Expresiones para guiar al oyente: First.../ However.../ As a result.../ From a technical perspective.../ Moving forward...",
        pattern: "[signpost], + statement",
        examples: ["First, the service is available. However, the response field contains an unexpected value. As a result, QA cannot approve the scenario."]
      },
      {
        title: "Modales de reunión",
        explanation: "need to (necesidad), should (recomendación), must (obligación fuerte), may/might (posibilidad), can (opción).",
        pattern: "Subject + modal + verb",
        examples: ["We need to confirm the rule.", "We should retest both scenarios.", "The approval must be documented.", "The delay may affect certification.", "Other tests can continue."]
      },
      {
        title: "Acuerdo y desacuerdo profesional",
        explanation: "Patrón Acknowledge–Concern–Proposal para discrepar sin confrontación.",
        pattern: "I understand... / My concern is... / I suggest...",
        examples: ["I understand the benefit of testing immediately. My concern is that the input data has not been validated. I suggest validating one sample first."]
      }
    ],
    readings: [
      {
        title: "Technical follow-up for a satellite interface",
        text: "The project team meets to review a file interface between the core platform and a satellite application. Development has completed the initial mapping, and QA has executed three scenarios. Two passed, but one produced an empty output file. The engineer gives a brief update using facts from Jira. The logs and generated files are already attached. The issue is reproducible, but it is a partial blocker because the remaining scenarios can continue. The functional analyst explains that the expected result depends on a business rule that is not fully documented. The vendor confirms that the technical process completed, but cannot yet confirm why no record was generated. The team compares two options: repeat the test immediately with corrected data, or wait for a deeper vendor analysis. They agree to run a controlled retest while the vendor continues the investigation. Before closing, the facilitator assigns actions, target dates and closure criteria.",
        summaryEs: "El equipo revisa una interfaz; dos de tres escenarios pasaron. Comparan dos opciones y deciden ejecutar una reprueba controlada mientras el proveedor investiga, cerrando con acciones y responsables asignados.",
        questions: ["How many scenarios passed?", "Why is the issue a partial blocker?", "Which two options are compared?", "What does the team decide?"]
      }
    ],
    conversations: [
      {
        title: "Daily status meeting",
        lines: [
          { speaker: "Facilitator", text: "Let us start with the QA status. Could you give us a quick update?" },
          { speaker: "Engineer", text: "We have completed the initial validation. Two scenarios passed, but one generated an empty file." },
          { speaker: "Facilitator", text: "Is the issue reproducible?" },
          { speaker: "Engineer", text: "Yes. We reproduced it twice. The logs and files are attached to Jira." },
          { speaker: "QA lead", text: "Can the remaining scenarios continue?" },
          { speaker: "Engineer", text: "Yes. This is a partial blocker." },
          { speaker: "Functional analyst", text: "Could an empty file be valid in this case?" },
          { speaker: "Engineer", text: "That is the main clarification. Based on the current criteria, we expected one record. Could you confirm the rule?" },
          { speaker: "Facilitator", text: "Good. Let us capture the owners and dates." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["blocker", "clarify", "own", "recap", "update"],
        items: [
          { text: "Let me give a quick ___.", answer: "update" },
          { text: "The main ___ is the missing configuration.", answer: "blocker" },
          { text: "Could you ___ what you mean?", answer: "clarify" },
          { text: "Who will ___ this action?", answer: "own" },
          { text: "Let me ___ the agreed steps.", answer: "recap" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "Antes de continuar, ¿podemos confirmar el resultado esperado?", answer: "Before we continue, could we confirm the expected result?" },
          { text: "Estoy de acuerdo con el objetivo, pero me preocupa la fecha.", answer: "I agree with the objective, but I am concerned about the date." },
          { text: "¿Quién será responsable de esta acción?", answer: "Who will own this action?" },
          { text: "¿Podemos acordar una fecha objetivo?", answer: "Can we agree on a target date?" },
          { text: "Permítanme resumir las decisiones.", answer: "Let me recap the decisions." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the professional tone",
        items: [
          { text: "Too direct: \"You are wrong.\"", options: ["I interpret the evidence differently. Could we review it together?", "This makes no sense."], answer: 0 },
          { text: "Too direct: \"Let me talk.\"", options: ["We cannot do anything.", "Sorry to interrupt, but may I add one point?"], answer: 1 }
        ]
      }
    ]
  },

  {
    id: "cine-1",
    area: "cine",
    title: "Talking About Movies and Series",
    subtitle: "Expresar gustos, opinar sobre películas y series, y describir personajes y escenas",
    level: "A2 → B1",
    grammarFocus: ["Present Simple for opinions", "Comparatives and superlatives"],
    recycled: [],
    newVocab: [
      { en: "movie / film", es: "película", example: "I watched a great movie last night." },
      { en: "series", es: "serie", example: "Have you watched that series yet?" },
      { en: "actor / actress", es: "actor / actriz", example: "The main actor was amazing." },
      { en: "character", es: "personaje", example: "The main character was very interesting." },
      { en: "genre", es: "género", example: "What's your favorite genre?" },
      { en: "plot", es: "trama / argumento", example: "The plot was confusing at first." },
      { en: "scene", es: "escena", example: "That scene made me cry." },
      { en: "review", es: "reseña / crítica", example: "I read a good review about it." },
      { en: "recommend", es: "recomendar", example: "Could you recommend a good movie?" },
      { en: "soundtrack", es: "banda sonora", example: "The soundtrack was beautiful." }
    ],
    corePhrases: [
      { en: "What kind of movies do you like?", use: "Preguntar por preferencias" },
      { en: "Have you watched that series yet?", use: "Preguntar por experiencia reciente" },
      { en: "I think the main character was very interesting.", use: "Dar una opinión" },
      { en: "It's one of my favorite movies.", use: "Expresar preferencia fuerte" },
      { en: "I would recommend it.", use: "Recomendar algo" },
      { en: "The plot was a bit slow at the beginning.", use: "Describir con matices" }
    ],
    grammarPoints: [
      {
        title: "Present Simple para opiniones y gustos",
        explanation: "Usa el presente simple con verbos como like, love, hate, prefer, think para expresar gustos y opiniones generales.",
        pattern: "Subject + like/love/hate/prefer + noun/gerund",
        examples: ["I love action movies.", "She prefers series to movies.", "What do you think of the ending?"]
      },
      {
        title: "Comparatives and superlatives",
        explanation: "Compara películas o personajes usando comparativos (-er / more) y superlativos (-est / most).",
        pattern: "adjective + -er/-est, or more/most + adjective",
        examples: ["This movie is better than the first one.", "It's the most exciting series I've watched.", "The book was more interesting than the film."]
      },
      {
        title: "Present Perfect para experiencias",
        explanation: "\"Have you watched...?\" pregunta por una experiencia sin importar cuándo exactamente ocurrió.",
        pattern: "Have/Has + subject + past participle...?",
        examples: ["Have you seen the new season?", "I haven't watched that movie yet.", "She has already finished the series."]
      }
    ],
    readings: [
      {
        title: "A Weekend Movie Marathon",
        text: "Last weekend, Laura watched three movies with her friends. On Friday, they watched a comedy, which was fun but a little predictable. On Saturday, they chose a science-fiction film with amazing special effects; the plot was more complex than they expected, but everyone enjoyed it. On Sunday, they watched a drama recommended by a friend. The main character was very emotional, and the ending surprised everyone. Laura wrote a short review for each movie and shared her opinions with her friends. She said the science-fiction film was the best one, because the story and the visual effects worked well together. Her friends agreed, but one of them preferred the drama because of the acting.",
        summaryEs: "Laura vio tres películas con amigos durante el fin de semana: una comedia, una de ciencia ficción y un drama. Compartió reseñas y opiniones; para ella la de ciencia ficción fue la mejor.",
        questions: ["What genre did they watch on Saturday?", "Why did Laura like the science-fiction film the most?", "Which movie did one of her friends prefer, and why?", "What did Laura do after watching each movie?"]
      }
    ],
    conversations: [
      {
        title: "Talking about a series",
        lines: [
          { speaker: "Ana", text: "Have you watched the new season yet?" },
          { speaker: "Marco", text: "Yes! I finished it last night." },
          { speaker: "Ana", text: "What did you think?" },
          { speaker: "Marco", text: "I loved it. The plot was more intense than the first season." },
          { speaker: "Ana", text: "Really? What's your favorite character?" },
          { speaker: "Marco", text: "Probably the detective. She's smart and really funny." },
          { speaker: "Ana", text: "I haven't started it yet. Is it worth watching?" },
          { speaker: "Marco", text: "Definitely. I would recommend it to anyone who likes mystery series." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["character", "plot", "recommend", "review", "genre"],
        items: [
          { text: "The main ___ was very interesting.", answer: "character" },
          { text: "The ___ was a bit confusing at first.", answer: "plot" },
          { text: "Could you ___ a good movie?", answer: "recommend" },
          { text: "I read a good ___ about it.", answer: "review" },
          { text: "What's your favorite ___?", answer: "genre" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "¿Qué tipo de películas te gustan?", answer: "What kind of movies do you like?" },
          { text: "¿Ya viste esa serie?", answer: "Have you watched that series yet?" },
          { text: "Creo que el personaje principal fue muy interesante.", answer: "I think the main character was very interesting." },
          { text: "Es una de mis películas favoritas.", answer: "It's one of my favorite movies." },
          { text: "Te la recomendaría.", answer: "I would recommend it." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["This movie is more good than the first one.", "This movie is better than the first one."], answer: 1 },
          { text: "2", options: ["Have you seen the new season?", "Have you saw the new season?"], answer: 0 },
          { text: "3", options: ["It's the most exciting series I've watched.", "It's the excitingest series I've watched."], answer: 0 },
          { text: "4", options: ["She prefer series to movies.", "She prefers series to movies."], answer: 1 }
        ]
      }
    ]
  },

  {
    id: "tecnologia-1",
    area: "tecnologia",
    title: "Talking About Apps and Technology",
    subtitle: "Hablar de aplicaciones, dispositivos, actualizaciones e inteligencia artificial en situaciones cotidianas y profesionales",
    level: "A2 → B1",
    grammarFocus: ["Present Continuous for trends", "Modals: should/could for tech advice"],
    recycled: [],
    newVocab: [
      { en: "app / application", es: "aplicación", example: "I just downloaded a new app." },
      { en: "device", es: "dispositivo", example: "Which device are you using?" },
      { en: "feature", es: "función / característica", example: "This app has a lot of useful features." },
      { en: "update", es: "actualización", example: "You should install the latest update." },
      { en: "bug", es: "error / falla", example: "I found a bug in the new version." },
      { en: "artificial intelligence (AI)", es: "inteligencia artificial", example: "AI is changing how we work." },
      { en: "battery", es: "batería", example: "My battery is running low." },
      { en: "password", es: "contraseña", example: "Please choose a strong password." },
      { en: "storage", es: "almacenamiento", example: "I'm running out of storage." },
      { en: "developer", es: "desarrollador", example: "She works as a software developer." }
    ],
    corePhrases: [
      { en: "Which device are you using?", use: "Preguntar por dispositivo" },
      { en: "You should update the app.", use: "Dar un consejo técnico" },
      { en: "I think AI is really useful for this.", use: "Opinar sobre tecnología" },
      { en: "Could you help me set this up?", use: "Pedir ayuda técnica" },
      { en: "It keeps crashing.", use: "Describir un problema" },
      { en: "Have you tried restarting it?", use: "Sugerir una solución" }
    ],
    grammarPoints: [
      {
        title: "Present Continuous para tendencias actuales",
        explanation: "Se usa is/are + verb-ing para hablar de tendencias o cambios que están ocurriendo actualmente en la tecnología.",
        pattern: "Subject + is/are + verb-ing",
        examples: ["More companies are using AI every day.", "We are moving to a new system.", "Everyone is talking about this app."]
      },
      {
        title: "Should / Could para consejos técnicos",
        explanation: "\"Should\" expresa una recomendación; \"could\" presenta una opción posible.",
        pattern: "Subject + should/could + verb",
        examples: ["You should back up your files.", "You could try a different browser.", "We should update the app before the meeting."]
      },
      {
        title: "Present Perfect para problemas recientes",
        explanation: "have/has + participio para hablar de un problema que acaba de ocurrir y sigue siendo relevante.",
        pattern: "Subject + have/has + past participle",
        examples: ["The app has crashed twice today.", "I have already tried restarting it.", "Have you installed the update?"]
      }
    ],
    readings: [
      {
        title: "Choosing a New App",
        text: "Daniel wants to download a new app to organize his daily tasks. He is comparing three different options. The first app has a simple design, but it does not have many features. The second app includes more features, like reminders and calendar integration, but some users say it has bugs. The third app uses artificial intelligence to suggest the best time for each task, which sounds interesting, but it needs an internet connection to work properly. Daniel reads several reviews before deciding. He thinks the second app is the best option for him, because the extra features are useful and the bugs seem minor. He downloads it and starts setting up his account. If he has any problems, he plans to contact the support team.",
        summaryEs: "Daniel compara tres apps para organizar tareas y, tras leer reseñas, elige la que tiene más funciones útiles aunque tenga algunos errores menores.",
        questions: ["What is Daniel trying to choose?", "What is different about the third app?", "Why does Daniel choose the second app?", "What will he do if he has problems?"]
      }
    ],
    conversations: [
      {
        title: "Tech support chat",
        lines: [
          { speaker: "Sofia", text: "Hey, my laptop is running really slowly." },
          { speaker: "Leo", text: "Have you restarted it recently?" },
          { speaker: "Sofia", text: "Yes, but it didn't help." },
          { speaker: "Leo", text: "How much storage do you have left?" },
          { speaker: "Sofia", text: "Not much, actually. Maybe that's the problem." },
          { speaker: "Leo", text: "You should delete some old files or move them to the cloud." },
          { speaker: "Sofia", text: "That's a good idea. Could you help me set that up?" },
          { speaker: "Leo", text: "Sure, I can show you after lunch." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["update", "device", "features", "bug", "password"],
        items: [
          { text: "Which ___ are you using?", answer: "device" },
          { text: "You should install the latest ___.", answer: "update" },
          { text: "This app has a lot of useful ___.", answer: "features" },
          { text: "I found a ___ in the new version.", answer: "bug" },
          { text: "Please choose a strong ___.", answer: "password" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "¿Qué dispositivo estás usando?", answer: "Which device are you using?" },
          { text: "Deberías actualizar la aplicación.", answer: "You should update the app." },
          { text: "Sigue fallando.", answer: "It keeps crashing." },
          { text: "¿Ya intentaste reiniciarlo?", answer: "Have you tried restarting it?" },
          { text: "¿Podrías ayudarme a configurarlo?", answer: "Could you help me set this up?" }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["More companies is using AI.", "More companies are using AI."], answer: 1 },
          { text: "2", options: ["You should backing up your files.", "You should back up your files."], answer: 1 },
          { text: "3", options: ["The app has crash twice today.", "The app has crashed twice today."], answer: 1 },
          { text: "4", options: ["Have you installed the update?", "Have you install the update?"], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "viajes-1",
    area: "viajes",
    title: "At the Airport and Hotel",
    subtitle: "Reservar, pedir información y resolver situaciones comunes durante un viaje",
    level: "A2 → B1",
    grammarFocus: ["Would like to for polite requests", "Prepositions of place and direction"],
    recycled: [],
    newVocab: [
      { en: "reservation", es: "reservación", example: "I would like to make a reservation." },
      { en: "boarding pass", es: "pase de abordar", example: "Please have your boarding pass ready." },
      { en: "luggage", es: "equipaje", example: "Where can I collect my luggage?" },
      { en: "destination", es: "destino", example: "What is your final destination?" },
      { en: "flight", es: "vuelo", example: "Our flight is delayed." },
      { en: "check-in", es: "registro / check-in", example: "Check-in closes 40 minutes before departure." },
      { en: "gate", es: "puerta de embarque", example: "The gate has changed to number 12." },
      { en: "delay", es: "retraso", example: "There is a two-hour delay." },
      { en: "directions", es: "indicaciones", example: "Could you give me directions to the hotel?" },
      { en: "refund", es: "reembolso", example: "Can I get a refund for this ticket?" }
    ],
    corePhrases: [
      { en: "I would like to make a reservation.", use: "Solicitud cortés" },
      { en: "How can I get to the airport?", use: "Pedir indicaciones" },
      { en: "Could you recommend a good restaurant?", use: "Pedir una recomendación" },
      { en: "Is there a shuttle to the hotel?", use: "Preguntar por transporte" },
      { en: "My flight has been delayed.", use: "Informar un problema" },
      { en: "Could I have a window seat, please?", use: "Pedir una preferencia" }
    ],
    grammarPoints: [
      {
        title: "Would like to + verb",
        explanation: "Forma cortés de expresar un deseo o hacer una solicitud, más formal que \"want\".",
        pattern: "Subject + would like to + verb",
        examples: ["I would like to check in early.", "We would like to change our seats.", "Would you like to upgrade your room?"]
      },
      {
        title: "Prepositions of place and direction",
        explanation: "Preposiciones como at, in, on, next to, across from, near se usan para dar direcciones.",
        pattern: "... + preposition + place",
        examples: ["The hotel is next to the train station.", "Turn left at the traffic light.", "The gate is across from the food court."]
      },
      {
        title: "Present Continuous for future arrangements",
        explanation: "Se usa is/are + verb-ing para hablar de planes de viaje ya confirmados.",
        pattern: "Subject + is/are + verb-ing + future time",
        examples: ["We are leaving tomorrow morning.", "I am arriving at 6 PM.", "They are staying for five nights."]
      }
    ],
    readings: [
      {
        title: "A Delayed Flight",
        text: "Carla arrived at the airport two hours before her flight, as recommended. She checked in online, so she only needed to drop off her luggage. At the counter, the agent informed her that the flight was delayed by two hours because of bad weather. Carla was not happy about the delay, but she understood the reason. She asked the agent about her connecting flight, and the agent confirmed that she would still make it, although the connection time would be shorter than expected. While waiting, Carla decided to have lunch near her gate. She also asked an airport employee for directions to a currency exchange office, which was located next to a coffee shop on the second floor.",
        summaryEs: "El vuelo de Carla se retrasa por mal tiempo; ella confirma su conexión, aprovecha el tiempo para almorzar y pide indicaciones para llegar a una casa de cambio.",
        questions: ["Why was Carla's flight delayed?", "What did she ask the agent about?", "Where did Carla have lunch?", "Where was the currency exchange office located?"]
      }
    ],
    conversations: [
      {
        title: "Checking into a hotel",
        lines: [
          { speaker: "Receptionist", text: "Good afternoon. Welcome to the hotel. Do you have a reservation?" },
          { speaker: "Guest", text: "Yes, I would like to check in. My name is Robert Lin." },
          { speaker: "Receptionist", text: "Let me check... Yes, I have your reservation for three nights." },
          { speaker: "Guest", text: "Perfect. Is breakfast included?" },
          { speaker: "Receptionist", text: "Yes, breakfast is served from 7 to 10 AM. Could I have your passport, please?" },
          { speaker: "Guest", text: "Sure, here you go." },
          { speaker: "Receptionist", text: "Thank you. Your room is on the fifth floor, next to the elevator." },
          { speaker: "Guest", text: "Great. Is there a shuttle to the airport?" },
          { speaker: "Receptionist", text: "Yes, it leaves every hour from the main entrance." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["reservation", "luggage", "gate", "delay", "directions"],
        items: [
          { text: "I would like to make a ___.", answer: "reservation" },
          { text: "Where can I collect my ___?", answer: "luggage" },
          { text: "The ___ has changed to number 12.", answer: "gate" },
          { text: "There is a two-hour ___.", answer: "delay" },
          { text: "Could you give me ___ to the hotel?", answer: "directions" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "Me gustaría hacer una reservación.", answer: "I would like to make a reservation." },
          { text: "¿Cómo puedo llegar al aeropuerto?", answer: "How can I get to the airport?" },
          { text: "¿Podrías recomendarme un buen restaurante?", answer: "Could you recommend a good restaurant?" },
          { text: "Mi vuelo se retrasó.", answer: "My flight has been delayed." },
          { text: "¿Hay transporte al hotel?", answer: "Is there a shuttle to the hotel?" }
        ]
      },
      {
        type: "order",
        title: "Order the words",
        items: [
          { text: "like / would / I / to / check in", answer: "i would like to check in" },
          { text: "is / next to the station / The / hotel", answer: "the hotel is next to the station" },
          { text: "get / how / to / can / I / the airport", answer: "how can i get to the airport" }
        ]
      }
    ]
  },

  {
    id: "vidacotidiana-1",
    area: "vidacotidiana",
    title: "Everyday Routines and Conversations",
    subtitle: "Hablar de rutinas, familia, compras y actividades diarias en conversaciones informales",
    level: "A1 → A2+",
    grammarFocus: ["Present Simple for routines", "Adverbs of frequency"],
    recycled: [],
    newVocab: [
      { en: "routine", es: "rutina", example: "My morning routine is very simple." },
      { en: "grocery shopping", es: "compras del supermercado", example: "I usually do the grocery shopping on Saturdays." },
      { en: "chores", es: "tareas domésticas", example: "We share the chores at home." },
      { en: "neighbor", es: "vecino/a", example: "My neighbor is very friendly." },
      { en: "appointment", es: "cita", example: "I have a doctor's appointment tomorrow." },
      { en: "errand", es: "diligencia / mandado", example: "I need to run a few errands." },
      { en: "exercise", es: "ejercicio", example: "I try to exercise every morning." },
      { en: "habit", es: "hábito", example: "Drinking water is a good habit." },
      { en: "weekday", es: "día laborable", example: "I work out on weekdays." },
      { en: "weekend", es: "fin de semana", example: "We usually relax on weekends." }
    ],
    corePhrases: [
      { en: "What time do you usually wake up?", use: "Preguntar por rutina" },
      { en: "I go grocery shopping every Saturday.", use: "Describir frecuencia" },
      { en: "I need to run a few errands today.", use: "Hablar de tareas pendientes" },
      { en: "We take turns doing the chores.", use: "Describir organización familiar" },
      { en: "How was your weekend?", use: "Iniciar conversación casual" },
      { en: "I try to exercise a few times a week.", use: "Hablar de hábitos" }
    ],
    grammarPoints: [
      {
        title: "Present Simple para rutinas",
        explanation: "Se usa el presente simple para hablar de acciones habituales o rutinarias.",
        pattern: "Subject + verb (+s for he/she/it)",
        examples: ["I wake up at 7 AM.", "She walks to work every day.", "They usually cook dinner together."]
      },
      {
        title: "Adverbios de frecuencia",
        explanation: "Palabras como always, usually, often, sometimes, rarely, never indican con qué frecuencia ocurre algo, y van antes del verbo principal (excepto con \"be\").",
        pattern: "Subject + adverb + verb",
        examples: ["I always check my email in the morning.", "We sometimes eat out on Fridays.", "He is never late."]
      },
      {
        title: "Preguntas con How often / What time",
        explanation: "Se usan para preguntar por frecuencia o por un horario específico.",
        pattern: "How often / What time + do/does + subject + verb...?",
        examples: ["How often do you go to the gym?", "What time do you usually have dinner?", "How often does she visit her family?"]
      }
    ],
    readings: [
      {
        title: "A Typical Weekday",
        text: "Every weekday, Marta wakes up at six thirty and drinks a cup of coffee before getting ready for work. She usually walks her dog for fifteen minutes, because the vet says regular exercise is good for him. After breakfast, she takes the bus to work, which takes about thirty minutes. In the evening, Marta and her husband share the household chores: one of them cooks dinner while the other one cleans the kitchen afterward. On Wednesdays, she goes grocery shopping on her way home. She rarely has time to relax during the week, so she looks forward to the weekend, when she usually meets friends or visits her parents.",
        summaryEs: "Marta describe su rutina de lunes a viernes: despertarse temprano, pasear al perro, ir al trabajo, compartir las tareas del hogar y hacer las compras los miércoles. Espera el fin de semana para descansar y ver a su familia.",
        questions: ["What does Marta do before getting ready for work?", "Why does she walk her dog?", "How do Marta and her husband share the chores?", "What does she usually do on weekends?"]
      }
    ],
    conversations: [
      {
        title: "Catching up with a friend",
        lines: [
          { speaker: "Jenny", text: "Hi! How was your weekend?" },
          { speaker: "Tom", text: "It was great, thanks. I visited my parents and we cooked together." },
          { speaker: "Jenny", text: "That sounds nice. Do you see them often?" },
          { speaker: "Tom", text: "Yes, usually once a month. What about you? What do you usually do on weekends?" },
          { speaker: "Jenny", text: "I try to exercise on Saturday mornings, and then I run a few errands." },
          { speaker: "Tom", text: "Do you ever go grocery shopping on weekends?" },
          { speaker: "Jenny", text: "Sometimes, but I usually prefer to do it after work on Wednesdays." },
          { speaker: "Tom", text: "That's smart, it's probably less crowded." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["routine", "chores", "errands", "habit", "weekend"],
        items: [
          { text: "My morning ___ is very simple.", answer: "routine" },
          { text: "We share the ___ at home.", answer: "chores" },
          { text: "I need to run a few ___ today.", answer: "errands" },
          { text: "Drinking water is a good ___.", answer: "habit" },
          { text: "We usually relax on the ___.", answer: "weekend" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "¿A qué hora sueles despertarte?", answer: "What time do you usually wake up?" },
          { text: "Voy de compras cada sábado.", answer: "I go grocery shopping every Saturday." },
          { text: "Necesito hacer algunas diligencias hoy.", answer: "I need to run a few errands today." },
          { text: "Nos turnamos para hacer las tareas del hogar.", answer: "We take turns doing the chores." },
          { text: "Trato de hacer ejercicio unas cuantas veces por semana.", answer: "I try to exercise a few times a week." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["She walk to work every day.", "She walks to work every day."], answer: 1 },
          { text: "2", options: ["I always checks my email.", "I always check my email."], answer: 1 },
          { text: "3", options: ["How often do you go to the gym?", "How often you go to the gym?"], answer: 0 },
          { text: "4", options: ["He is never late.", "He never is late."], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "cine-2",
    area: "cine",
    title: "Actors, Genres, and Reviews",
    subtitle: "Hablar sobre actores, géneros y escribir opiniones sobre películas",
    level: "B1",
    grammarFocus: ["Comparatives and superlatives", "Present Perfect for experience"],
    recycled: ["movie", "genre", "character", "recommend"],
    newVocab: [
      { en: "actor / actress", es: "actor / actriz", example: "The lead actor gave an incredible performance." },
      { en: "performance", es: "actuación", example: "The acting was incredible." },
      { en: "award", es: "premio", example: "The film won three awards." },
      { en: "plot twist", es: "giro de la trama", example: "The plot twist at the end was amazing." },
      { en: "sequel", es: "secuela", example: "I liked the sequel more than the original." },
      { en: "cast", es: "reparto", example: "The cast was excellent." },
      { en: "review", es: "reseña / crítica", example: "I read a great review about it." },
      { en: "rating", es: "calificación", example: "I'd give it four out of five stars." },
      { en: "blockbuster", es: "éxito de taquilla", example: "It was the summer's biggest blockbuster." },
      { en: "underrated", es: "subestimado/a", example: "It's a bit underrated, in my opinion." }
    ],
    corePhrases: [
      { en: "Have you seen any good movies lately?", use: "Iniciar conversación sobre cine" },
      { en: "The acting was incredible.", use: "Elogiar una actuación" },
      { en: "I'd give it four out of five stars.", use: "Dar una calificación" },
      { en: "It's based on a true story.", use: "Describir el origen de una película" },
      { en: "The plot twist at the end was amazing.", use: "Comentar la trama" },
      { en: "It's a bit overrated, in my opinion.", use: "Dar una opinión crítica con cortesía" }
    ],
    grammarPoints: [
      {
        title: "Comparatives and superlatives",
        explanation: "Se usan para comparar películas, actores o actuaciones entre sí.",
        pattern: "adjective + -er/-est, or more/most + adjective",
        examples: ["This actor is more talented than the lead in the sequel.", "It's the best movie I've seen this year.", "The reviews were more positive than expected."]
      },
      {
        title: "Present Perfect para experiencias cinéfilas",
        explanation: "have/has + participio para preguntar o hablar sobre experiencias de ver películas, sin importar cuándo exactamente.",
        pattern: "Subject + have/has (not) + past participle",
        examples: ["Have you seen the new Marvel movie?", "I haven't watched anything good in months.", "She has already seen it twice."]
      }
    ],
    readings: [
      {
        title: "A Weekend at the Movies: A Short Review",
        text: "This weekend, I watched the new mystery film that everyone has been talking about, and I have to say, it lived up to the hype. The cast was excellent, especially the lead actress, whose performance felt completely believable from the first scene to the last. The plot twist near the end genuinely surprised me, which doesn't happen often anymore. If I had to give it a rating, I would say four out of five stars. The only reason I'm not giving it a perfect score is that the pacing in the middle felt a little slow. Still, compared to most blockbusters this year, it's easily one of the more thoughtful ones. I'd recommend it to anyone who enjoys a good mystery with strong characters rather than just special effects.",
        summaryEs: "El autor reseña una película de misterio: elogia el reparto y el giro de la trama, pero señala que el ritmo a mitad de la película es un poco lento. La recomienda con una calificación de 4 de 5 estrellas.",
        questions: ["What genre is the film?", "What did the reviewer like most?", "What was the one weakness mentioned?", "What rating did the reviewer give it?"]
      }
    ],
    conversations: [
      {
        title: "Discussing a movie rating",
        lines: [
          { speaker: "Sam", text: "Have you seen any good movies lately?" },
          { speaker: "Priya", text: "Yes! I watched that new mystery film everyone's talking about." },
          { speaker: "Sam", text: "Oh, what did you think?" },
          { speaker: "Priya", text: "The acting was incredible, and the plot twist at the end was amazing." },
          { speaker: "Sam", text: "Would you recommend it?" },
          { speaker: "Priya", text: "Definitely. I'd give it four out of five stars." },
          { speaker: "Sam", text: "Why not five?" },
          { speaker: "Priya", text: "It's a bit slow in the middle, but the ending makes up for it." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["performance", "rating", "cast", "sequel", "review"],
        items: [
          { text: "The lead actor gave an incredible ___.", answer: "performance" },
          { text: "I'd give it four out of five stars as a ___.", answer: "rating" },
          { text: "The ___ was excellent in this film.", answer: "cast" },
          { text: "I liked the ___ more than the original movie.", answer: "sequel" },
          { text: "I read a great ___ about it online.", answer: "review" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "¿Has visto alguna buena película últimamente?", answer: "Have you seen any good movies lately?" },
          { text: "Le daría cuatro de cinco estrellas.", answer: "I'd give it four out of five stars." },
          { text: "Está basada en una historia real.", answer: "It's based on a true story." },
          { text: "Este actor es más talentoso que el otro.", answer: "This actor is more talented than the other one." },
          { text: "Es la mejor película que he visto este año.", answer: "It's the best movie I've seen this year." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["This actor is more talented than the lead in the sequel.", "This actor is talentedder than the lead."], answer: 0 },
          { text: "2", options: ["Have you seen the new Marvel movie?", "Have you see the new Marvel movie?"], answer: 0 },
          { text: "3", options: ["It's the best movie I've seen this year.", "It's the goodest movie I've seen this year."], answer: 0 },
          { text: "4", options: ["I haven't watched anything good in months.", "I haven't watch anything good in months."], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "tecnologia-2",
    area: "tecnologia",
    title: "Talking About AI and New Tools",
    subtitle: "Opinar sobre inteligencia artificial y nuevas herramientas tecnológicas",
    level: "B1",
    grammarFocus: ["Will for predictions", "Might/May for possibility"],
    recycled: ["app", "device", "update", "feature"],
    newVocab: [
      { en: "artificial intelligence (AI)", es: "inteligencia artificial", example: "I've been using an AI tool for work." },
      { en: "chatbot", es: "chatbot", example: "The chatbot answered my question instantly." },
      { en: "automate", es: "automatizar", example: "It can automate repetitive tasks." },
      { en: "efficient", es: "eficiente", example: "It makes things so much more efficient." },
      { en: "algorithm", es: "algoritmo", example: "The algorithm recommends videos based on your history." },
      { en: "privacy", es: "privacidad", example: "I'm a bit worried about privacy." },
      { en: "convenient", es: "conveniente / práctico/a", example: "It's very convenient for quick tasks." },
      { en: "innovative", es: "innovador/a", example: "It's a really innovative tool." },
      { en: "replace", es: "reemplazar", example: "Do you think it will replace jobs?" },
      { en: "reliable", es: "confiable", example: "It's not always reliable." }
    ],
    corePhrases: [
      { en: "I've been using this AI tool for work.", use: "Compartir una experiencia reciente" },
      { en: "It makes things so much more efficient.", use: "Elogiar una herramienta" },
      { en: "I'm a bit worried about privacy.", use: "Expresar una preocupación" },
      { en: "It can automate repetitive tasks.", use: "Explicar una función" },
      { en: "Do you think it will replace jobs?", use: "Preguntar por una predicción" },
      { en: "It's not always reliable.", use: "Señalar una limitación" }
    ],
    grammarPoints: [
      {
        title: "Will para predicciones",
        explanation: "will + verbo base se usa para hacer predicciones sobre el futuro, con o sin certeza total.",
        pattern: "Subject + will (not) + verb",
        examples: ["AI will change how we work.", "I don't think it will replace every job.", "This technology will become more common."]
      },
      {
        title: "Might / May para posibilidad",
        explanation: "might/may + verbo base expresan que algo es posible, pero no seguro.",
        pattern: "Subject + might/may + verb",
        examples: ["This might save you a lot of time.", "It may not work perfectly for everyone.", "Prices might go down next year."]
      }
    ],
    readings: [
      {
        title: "Trying an AI Assistant at Work",
        text: "Last month, Carla's company introduced a new AI assistant to help with scheduling and answering common questions from clients. At first, she was skeptical. She worried it might feel impersonal, and she wasn't sure it would actually save her any time. After a few weeks, though, her opinion changed. The assistant handled repetitive questions automatically, which meant Carla could focus on more complex requests. It wasn't perfect: sometimes it misunderstood a question and gave a strange answer, so she still had to check its work. Overall, she believes tools like this will become more common in the next few years, but she doesn't think they will completely replace the personal touch that clients value.",
        summaryEs: "Carla, al principio escéptica, comienza a usar un asistente de IA en su trabajo. Aunque no es perfecto, le ahorra tiempo en tareas repetitivas, y ella cree que este tipo de herramientas se volverán más comunes sin reemplazar completamente el trato humano.",
        questions: ["What was Carla's first reaction to the AI assistant?", "What problem did the assistant sometimes have?", "What does Carla believe about the future of these tools?"]
      }
    ],
    conversations: [
      {
        title: "Debating AI tools at work",
        lines: [
          { speaker: "Marco", text: "I've been using this AI tool for work. It makes things so much more efficient." },
          { speaker: "Sofia", text: "Really? I'm a bit worried about privacy, to be honest." },
          { speaker: "Marco", text: "That's fair. It can automate repetitive tasks, but I'm careful about what information I share." },
          { speaker: "Sofia", text: "Do you think it will replace jobs eventually?" },
          { speaker: "Marco", text: "Some tasks, maybe. But I don't think it will replace people completely." },
          { speaker: "Sofia", text: "It's not always reliable either, from what I've heard." },
          { speaker: "Marco", text: "True, it makes mistakes sometimes. You still have to check its work." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["automate", "efficient", "reliable", "privacy", "replace"],
        items: [
          { text: "It can ___ repetitive tasks.", answer: "automate" },
          { text: "It makes things so much more ___.", answer: "efficient" },
          { text: "It's not always ___.", answer: "reliable" },
          { text: "I'm a bit worried about ___.", answer: "privacy" },
          { text: "Do you think it will ___ jobs?", answer: "replace" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "He estado usando esta herramienta de IA para el trabajo.", answer: "I've been using this AI tool for work." },
          { text: "Puede automatizar tareas repetitivas.", answer: "It can automate repetitive tasks." },
          { text: "Estoy un poco preocupado por la privacidad.", answer: "I'm a bit worried about privacy." },
          { text: "No siempre es confiable.", answer: "It's not always reliable." },
          { text: "Esto podría ahorrarte mucho tiempo.", answer: "This might save you a lot of time." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["AI will change how we work.", "AI change how we work will."], answer: 0 },
          { text: "2", options: ["It might not work perfectly for everyone.", "It might not working perfectly for everyone."], answer: 0 },
          { text: "3", options: ["I don't think it will replace every job.", "I don't think it replace every job will."], answer: 0 },
          { text: "4", options: ["Prices might go down next year.", "Prices might going down next year."], answer: 0 }
        ]
      }
    ]
  },

  {
    id: "viajes-2",
    area: "viajes",
    title: "At the Hotel and Restaurant",
    subtitle: "Registrarse en un hotel, pedir en un restaurante y resolver pequeños problemas con cortesía",
    level: "A2+",
    grammarFocus: ["Could / Would for polite requests", "Present Simple for facts and menus"],
    recycled: ["reservation", "gate", "flight"],
    newVocab: [
      { en: "receptionist", es: "recepcionista", example: "The receptionist checked us in quickly." },
      { en: "room service", es: "servicio a la habitación", example: "We ordered room service last night." },
      { en: "complain", es: "quejarse", example: "I need to complain about the noise." },
      { en: "refund", es: "reembolso", example: "Could I get a refund for this?" },
      { en: "menu", es: "menú", example: "Could we see the menu, please?" },
      { en: "waiter / waitress", es: "mesero/a", example: "The waiter recommended the fish." },
      { en: "bill", es: "cuenta", example: "Could we get the bill, please?" },
      { en: "allergic", es: "alérgico/a", example: "I'm allergic to nuts." },
      { en: "service charge", es: "cargo por servicio", example: "Is there a service charge included?" },
      { en: "complimentary", es: "gratuito/a (de cortesía)", example: "Breakfast is complimentary." }
    ],
    corePhrases: [
      { en: "I have a reservation under the name...", use: "Registrarse en un hotel" },
      { en: "Could we see the menu, please?", use: "Pedir el menú" },
      { en: "I'm allergic to nuts.", use: "Informar una alergia alimentaria" },
      { en: "Could we get the bill, please?", use: "Pedir la cuenta" },
      { en: "The room isn't what I expected.", use: "Quejarse con cortesía" },
      { en: "Is there a service charge included?", use: "Preguntar sobre costos" }
    ],
    grammarPoints: [
      {
        title: "Could / Would para solicitudes corteses",
        explanation: "Could you...? y Would you...? son formas educadas de pedir algo, muy usadas en hoteles y restaurantes.",
        pattern: "Could/Would + you + verb...?",
        examples: ["Could we see the menu, please?", "Would you recommend something?", "Could I get a refund for this?"]
      },
      {
        title: "Present Simple para hechos y menús",
        explanation: "Se usa para describir lo que un lugar ofrece de forma habitual.",
        pattern: "Subject + verb (+s)",
        examples: ["Breakfast is complimentary.", "The restaurant serves dinner until ten.", "This dish comes with a side salad."]
      }
    ],
    readings: [
      {
        title: "Checking In and Dining Out",
        text: "When Laura and Tom arrived at the hotel, the receptionist welcomed them warmly and confirmed their reservation. Unfortunately, their room wasn't quite ready, so she offered them complimentary coffee in the lobby while they waited. Twenty minutes later, they were shown to a comfortable room with a nice view of the garden. That evening, they decided to eat at the hotel restaurant. The waiter brought the menu and recommended the grilled salmon. Tom mentioned he was allergic to shellfish, and the waiter suggested a different dish instead. The food was delicious, and at the end of the meal, they asked for the bill. Laura noticed a small service charge included and asked the waiter to confirm it, just to make sure there wasn't a mistake.",
        summaryEs: "Laura y Tom se registran en un hotel y, aunque su habitación no estaba lista al principio, disfrutan de café de cortesía. Por la noche cenan en el restaurante del hotel, donde Tom menciona una alergia y el mesero les recomienda un plato alternativo.",
        questions: ["Why did the receptionist offer them coffee?", "What did Tom mention to the waiter?", "What did Laura ask about at the end of the meal?"]
      }
    ],
    conversations: [
      {
        title: "Ordering at a restaurant",
        lines: [
          { speaker: "Waiter", text: "Good evening. Could I get you started with something to drink?" },
          { speaker: "Guest", text: "Yes, could we see the menu first, please?" },
          { speaker: "Waiter", text: "Of course, here you go. Today's special is the grilled salmon." },
          { speaker: "Guest", text: "That sounds great, but I'm allergic to nuts. Does it contain any?" },
          { speaker: "Waiter", text: "No, it doesn't. It's completely safe for you." },
          { speaker: "Guest", text: "Perfect, I'll have that, please." },
          { speaker: "Waiter", text: "Excellent choice. I'll bring that right out." },
          { speaker: "Guest", text: "Thank you. Could we also get some water, please?" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["menu", "bill", "allergic", "receptionist", "refund"],
        items: [
          { text: "Could we see the ___, please?", answer: "menu" },
          { text: "Could we get the ___, please?", answer: "bill" },
          { text: "I'm ___ to nuts.", answer: "allergic" },
          { text: "The ___ checked us in quickly.", answer: "receptionist" },
          { text: "Could I get a ___ for this?", answer: "refund" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "Tengo una reservación a nombre de...", answer: "I have a reservation under the name..." },
          { text: "¿Podríamos ver el menú, por favor?", answer: "Could we see the menu, please?" },
          { text: "Soy alérgico a las nueces.", answer: "I'm allergic to nuts." },
          { text: "La habitación no es lo que esperaba.", answer: "The room isn't what I expected." },
          { text: "¿Hay un cargo por servicio incluido?", answer: "Is there a service charge included?" }
        ]
      },
      {
        type: "order",
        title: "Order the words",
        items: [
          { text: "menu / see / the / we / could / please", answer: "could we see the menu please" },
          { text: "allergic / nuts / I'm / to", answer: "i'm allergic to nuts" },
          { text: "get / bill / could / the / we / please", answer: "could we get the bill please" }
        ]
      }
    ]
  },

  {
    id: "vidacotidiana-2",
    area: "vidacotidiana",
    title: "Health and Wellness",
    subtitle: "Hablar sobre síntomas, pedir consejos de salud y programar una cita médica",
    level: "A2+",
    grammarFocus: ["Should for advice", "Present Perfect Continuous (light)"],
    recycled: ["exercise", "habit", "appointment"],
    newVocab: [
      { en: "symptom", es: "síntoma", example: "What symptoms do you have?" },
      { en: "appointment", es: "cita", example: "I need to make an appointment." },
      { en: "prescription", es: "receta médica", example: "The doctor gave me a prescription." },
      { en: "stressed", es: "estresado/a", example: "I've been really stressed lately." },
      { en: "healthy", es: "saludable", example: "She eats a healthy diet." },
      { en: "diet", es: "dieta / alimentación", example: "He is on a low-sugar diet." },
      { en: "sleep", es: "dormir / sueño", example: "Try to get more sleep." },
      { en: "headache", es: "dolor de cabeza", example: "I have a headache and a sore throat." },
      { en: "medicine", es: "medicina / medicamento", example: "Take this medicine twice a day." },
      { en: "rest", es: "descansar", example: "You should rest for a few days." }
    ],
    corePhrases: [
      { en: "I haven't been feeling well.", use: "Explicar que no te sientes bien" },
      { en: "I have a headache and a sore throat.", use: "Describir síntomas" },
      { en: "You should see a doctor.", use: "Dar un consejo de salud" },
      { en: "I need to make an appointment.", use: "Pedir una cita" },
      { en: "Try to get more sleep.", use: "Sugerir un hábito saludable" },
      { en: "I've been really stressed lately.", use: "Hablar de estrés" }
    ],
    grammarPoints: [
      {
        title: "Should para dar consejos",
        explanation: "should + verbo base se usa para recomendar algo, de forma suave pero clara.",
        pattern: "Subject + should (not) + verb",
        examples: ["You should see a doctor.", "You shouldn't skip breakfast.", "We should exercise more."]
      },
      {
        title: "Present Perfect Continuous para situaciones recientes",
        explanation: "have/has + been + verbo-ing describe algo que ha estado pasando recientemente y que aún es relevante.",
        pattern: "Subject + have/has + been + verb-ing",
        examples: ["I haven't been feeling well.", "I've been really stressed lately.", "She has been sleeping badly this week."]
      }
    ],
    readings: [
      {
        title: "A Visit to the Doctor",
        text: "Marta hadn't been feeling well for almost a week, so she finally decided to make an appointment with her doctor. She explained that she had a headache, a sore throat, and had been sleeping badly. The doctor asked a few questions and checked her temperature. \"It looks like a mild cold,\" the doctor said. \"You should rest, drink plenty of water, and try to get more sleep.\" The doctor also gave her a prescription for something to help with the sore throat. Before Marta left, the doctor asked about her general routine. Marta admitted she had been really stressed at work lately and hadn't been exercising much. The doctor suggested she try to take short walks during the day, even just for stress relief, not only for physical health.",
        summaryEs: "Marta visita al médico porque no se ha sentido bien durante casi una semana. El doctor le diagnostica un resfriado leve, le receta algo para la garganta y le recomienda descansar, dormir más y caminar para reducir el estrés.",
        questions: ["What symptoms did Marta have?", "What did the doctor recommend?", "Why did the doctor suggest short walks?"]
      }
    ],
    conversations: [
      {
        title: "Giving health advice to a friend",
        lines: [
          { speaker: "Diego", text: "You look tired. Are you okay?" },
          { speaker: "Elena", text: "Not really. I haven't been feeling well since Monday." },
          { speaker: "Diego", text: "What's wrong?" },
          { speaker: "Elena", text: "I have a headache and a sore throat, and I've been really stressed lately too." },
          { speaker: "Diego", text: "You should see a doctor, honestly." },
          { speaker: "Elena", text: "I know, I need to make an appointment." },
          { speaker: "Diego", text: "And try to get more sleep. You've been working too much." },
          { speaker: "Elena", text: "You're right. I'll call the clinic today." }
        ]
      }
    ],
    exercises: [
      {
        type: "fill-blank",
        title: "Complete the sentences",
        bank: ["headache", "appointment", "stressed", "prescription", "rest"],
        items: [
          { text: "I have a ___ and a sore throat.", answer: "headache" },
          { text: "I need to make an ___.", answer: "appointment" },
          { text: "I've been really ___ lately.", answer: "stressed" },
          { text: "The doctor gave me a ___.", answer: "prescription" },
          { text: "You should ___ for a few days.", answer: "rest" }
        ]
      },
      {
        type: "translate",
        title: "Translate into English",
        items: [
          { text: "No me he sentido bien.", answer: "I haven't been feeling well." },
          { text: "Deberías ver a un médico.", answer: "You should see a doctor." },
          { text: "Necesito hacer una cita.", answer: "I need to make an appointment." },
          { text: "Trata de dormir más.", answer: "Try to get more sleep." },
          { text: "He estado muy estresado últimamente.", answer: "I've been really stressed lately." }
        ]
      },
      {
        type: "mcq",
        title: "Choose the correct sentence",
        items: [
          { text: "1", options: ["You should see a doctor.", "You should to see a doctor."], answer: 0 },
          { text: "2", options: ["I haven't been feeling well.", "I haven't feeling well since."], answer: 0 },
          { text: "3", options: ["We should exercise more.", "We should exercising more."], answer: 0 },
          { text: "4", options: ["She has been sleeping badly this week.", "She has being sleeping badly this week."], answer: 0 }
        ]
      }
    ]
  }
];

// Curated verb list — verbs that appear repeatedly across the six units, useful for technical workplace English.
export const VERBS = [
  { base: "be", third: "is", ing: "being", past: "was/were", participle: "been", type: "irregular" },
  { base: "have", third: "has", ing: "having", past: "had", participle: "had", type: "irregular" },
  { base: "do", third: "does", ing: "doing", past: "did", participle: "done", type: "irregular" },
  { base: "go", third: "goes", ing: "going", past: "went", participle: "gone", type: "irregular" },
  { base: "send", third: "sends", ing: "sending", past: "sent", participle: "sent", type: "irregular" },
  { base: "receive", third: "receives", ing: "receiving", past: "received", participle: "received", type: "regular" },
  { base: "report", third: "reports", ing: "reporting", past: "reported", participle: "reported", type: "regular" },
  { base: "investigate", third: "investigates", ing: "investigating", past: "investigated", participle: "investigated", type: "regular" },
  { base: "review", third: "reviews", ing: "reviewing", past: "reviewed", participle: "reviewed", type: "regular" },
  { base: "complete", third: "completes", ing: "completing", past: "completed", participle: "completed", type: "regular" },
  { base: "attach", third: "attaches", ing: "attaching", past: "attached", participle: "attached", type: "regular" },
  { base: "confirm", third: "confirms", ing: "confirming", past: "confirmed", participle: "confirmed", type: "regular" },
  { base: "provide", third: "provides", ing: "providing", past: "provided", participle: "provided", type: "regular" },
  { base: "need", third: "needs", ing: "needing", past: "needed", participle: "needed", type: "regular" },
  { base: "validate", third: "validates", ing: "validating", past: "validated", participle: "validated", type: "regular" },
  { base: "reproduce", third: "reproduces", ing: "reproducing", past: "reproduced", participle: "reproduced", type: "regular" },
  { base: "block", third: "blocks", ing: "blocking", past: "blocked", participle: "blocked", type: "regular" },
  { base: "fail", third: "fails", ing: "failing", past: "failed", participle: "failed", type: "regular" },
  { base: "pass", third: "passes", ing: "passing", past: "passed", participle: "passed", type: "regular" },
  { base: "test", third: "tests", ing: "testing", past: "tested", participle: "tested", type: "regular" },
  { base: "update", third: "updates", ing: "updating", past: "updated", participle: "updated", type: "regular" },
  { base: "request", third: "requests", ing: "requesting", past: "requested", participle: "requested", type: "regular" },
  { base: "explain", third: "explains", ing: "explaining", past: "explained", participle: "explained", type: "regular" },
  { base: "follow", third: "follows", ing: "following", past: "followed", participle: "followed", type: "regular" },
  { base: "escalate", third: "escalates", ing: "escalating", past: "escalated", participle: "escalated", type: "regular" },
  { base: "identify", third: "identifies", ing: "identifying", past: "identified", participle: "identified", type: "regular" },
  { base: "reserve", third: "reserves", ing: "reserving", past: "reserved", participle: "reserved", type: "regular" },
  { base: "prepare", third: "prepares", ing: "preparing", past: "prepared", participle: "prepared", type: "regular" },
  { base: "check", third: "checks", ing: "checking", past: "checked", participle: "checked", type: "regular" },
  { base: "start", third: "starts", ing: "starting", past: "started", participle: "started", type: "regular" },
  { base: "clarify", third: "clarifies", ing: "clarifying", past: "clarified", participle: "clarified", type: "regular" },
  { base: "close", third: "closes", ing: "closing", past: "closed", participle: "closed", type: "regular" },
  { base: "run", third: "runs", ing: "running", past: "ran", participle: "run", type: "irregular" },
  { base: "give", third: "gives", ing: "giving", past: "gave", participle: "given", type: "irregular" },
  { base: "meet", third: "meets", ing: "meeting", past: "met", participle: "met", type: "irregular" },
  { base: "understand", third: "understands", ing: "understanding", past: "understood", participle: "understood", type: "irregular" },
  { base: "know", third: "knows", ing: "knowing", past: "knew", participle: "known", type: "irregular" },
  { base: "think", third: "thinks", ing: "thinking", past: "thought", participle: "thought", type: "irregular" },
  { base: "generate", third: "generates", ing: "generating", past: "generated", participle: "generated", type: "regular" },
  { base: "schedule", third: "schedules", ing: "scheduling", past: "scheduled", participle: "scheduled", type: "regular" }
];

// Tense templates using "go" as the model verb (matches the pattern requested).
export function tenseTable(verb) {
  const be3 = "is";
  return [
    { tense: "Present Simple", affirmative: `I ${verb.base} / He ${verb.third}`, negative: `I do not ${verb.base} / He does not ${verb.base}`, question: `Do I ${verb.base}? / Does he ${verb.base}?`, use: "Hechos, rutinas, comportamiento general del sistema." },
    { tense: "Present Continuous", affirmative: `I am ${verb.ing}`, negative: `I am not ${verb.ing}`, question: `Am I ${verb.ing}?`, use: "Acción en curso ahora mismo." },
    { tense: "Past Simple", affirmative: `I ${verb.past}`, negative: `I did not ${verb.base}`, question: `Did I ${verb.base}?`, use: "Acción terminada con momento definido (yesterday, on Monday)." },
    { tense: "Past Continuous", affirmative: `I was ${verb.ing}`, negative: `I was not ${verb.ing}`, question: `Was I ${verb.ing}?`, use: "Acción en curso en un momento pasado." },
    { tense: "Present Perfect", affirmative: `I have ${verb.participle}`, negative: `I have not ${verb.participle}`, question: `Have I ${verb.participle}?`, use: "Resultado relevante ahora, sin fecha específica (already, yet, so far)." },
    { tense: "Past Perfect", affirmative: `I had ${verb.participle}`, negative: `I had not ${verb.participle}`, question: `Had I ${verb.participle}?`, use: "Acción anterior a otra acción pasada." },
    { tense: "Future (will)", affirmative: `I will ${verb.base}`, negative: `I will not ${verb.base}`, question: `Will I ${verb.base}?`, use: "Predicción, decisión espontánea, promesa." }
  ];
}

// Aggregate helpers -----------------------------------------------------

export function areaOf(id) {
  return AREAS.find(a => a.id === id);
}

export function unitsByArea(areaId) {
  return UNITS.filter(u => u.area === areaId);
}

export function allVocab() {
  const seen = new Map();
  UNITS.forEach(u => {
    u.newVocab.forEach(v => {
      if (!seen.has(v.en)) {
        seen.set(v.en, { ...v, unit: u.id, area: u.area, areas: [u.area] });
      } else {
        const existing = seen.get(v.en);
        if (!existing.areas.includes(u.area)) existing.areas.push(u.area);
      }
    });
  });
  return Array.from(seen.values());
}

export function allCorePhrases() {
  const out = [];
  UNITS.forEach(u => u.corePhrases.forEach(p => out.push({ ...p, unit: u.id, area: u.area })));
  return out;
}

export function allGrammarPoints() {
  const out = [];
  UNITS.forEach(u => u.grammarPoints.forEach(g => out.push({ ...g, unit: u.id, unitTitle: u.title, area: u.area })));
  return out;
}

export function allExercises() {
  const out = [];
  UNITS.forEach(u => u.exercises.forEach((ex, i) => out.push({ ...ex, unit: u.id, unitTitle: u.title, area: u.area, exerciseIndex: i, id: `${u.id}-e${i}` })));
  return out;
}

export function allReadings() {
  const out = [];
  UNITS.forEach(u => u.readings.forEach(r => out.push({ ...r, unit: u.id, unitTitle: u.title, area: u.area })));
  return out;
}

export function allConversations() {
  const out = [];
  UNITS.forEach(u => u.conversations.forEach(c => out.push({ ...c, unit: u.id, unitTitle: u.title, area: u.area })));
  return out;
}

// A small local dictionary used for instant word/phrase lookups in the Reading module
// (falls back to the AI tutor for anything not covered here).
export const QUICK_DICTIONARY = (() => {
  const dict = {};
  allVocab().forEach(v => { dict[v.en.toLowerCase()] = v; });
  return dict;
})();
