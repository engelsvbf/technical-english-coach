// "Cuentos y Literatura" — original short stories (2+ pages each), one per interest
// area to start, classified by CEFR level. Each story carries its own curated
// vocabulary, grammar focus, and a 15-question evaluation split across five
// dimensions (comprehension, vocabulary, grammar, pronunciation, expressions).
//
// This module ships with one B1-level story per area (5 total) as the first
// wave of a planned full A1–C1 set per area. More levels/stories can be added
// to STORIES below following the same shape.

export const STORIES = [
  {
    id: "story-cine-b1",
    area: "cine",
    level: "B1",
    title: "The Audition",
    subtitle: "Una actriz enfrenta sus nervios antes de una audición decisiva",
    text: `Maria had been preparing for this audition for three weeks. She had read the script more than twenty times, and she had practiced her lines in front of the mirror every single night. Still, when she arrived at the studio, her hands were shaking.

The waiting room was full of other actors. Some of them were reading their scripts one last time. Others were talking quietly, trying to stay calm. Maria sat in the corner and closed her eyes. She remembered what her acting teacher had told her: "The character is not you. Trust her, and let her speak."

When her name was called, Maria walked into the room. Three people were sitting behind a long table: the director, the producer, and the casting assistant. They smiled and asked her to begin whenever she was ready.

She took a deep breath and started the scene. At first, her voice sounded a little nervous, but after a few lines, something changed. She stopped thinking about the audition and started thinking about the character instead. The character was a young woman who had just lost her job and didn't know what to do next. Maria understood that feeling very well, because she had lost her own job six months earlier, right before she decided to focus on acting full time.

By the end of the scene, the room was completely silent. The director looked at the producer, and the producer looked back at him with a small smile. "That was very honest," the director said. "Thank you, Maria. We'll be in touch."

Maria left the studio without knowing what would happen next. She walked to the train station, replaying the scene in her head again and again. Had she said the second line too quickly? Had she paused too long before the ending? She couldn't stop thinking about it.

Three days later, her phone rang. It was the casting assistant. "Congratulations," the voice said. "The director wants you for the role."

Maria sat down on her bed, unable to speak for a moment. All those weeks of practice, all the nights in front of the mirror, all the doubts — they had led to this moment. She thought about her acting teacher's advice again. Maybe trusting the character had helped her more than she realized.

The next morning, Maria called her best friend to share the news. "I still can't believe it," she said. "I was so nervous I almost didn't go."

"But you went," her friend answered. "And that's the only thing that mattered."

Later that week, Maria received the full script for the film. It was longer and more complex than the scene she had performed at the audition, but she wasn't afraid anymore. She had already proven to herself that she could do it. Now she just needed to keep working, scene by scene, just like she had done before.

On her first day of filming, Maria arrived at the set two hours early. She wanted to walk around the location, understand the space, and imagine her character moving through it. When the director saw her, he laughed. "You're the first one here," he said. "Every single day."

"I don't want to waste this chance," Maria replied.

Months later, when the film was finally released, Maria watched it in a small cinema with her family. She barely recognized her own voice at first; the character on the screen felt so real. When the lights came back on, her mother turned to her with tears in her eyes. "You did it," she whispered.

Maria smiled. She thought about the audition, about the shaking hands, about the silence in the room before the director spoke. It had all been worth it.`,
    summaryEs: "Maria se prepara durante semanas para una audición y, a pesar de los nervios, logra confiar en su personaje. Consigue el papel, trabaja con disciplina durante el rodaje y finalmente ve la película terminada junto a su familia.",
    vocab: [
      { en: "audition", es: "audición", example: "Maria had been preparing for this audition for three weeks." },
      { en: "script", es: "guion", example: "She had read the script more than twenty times." },
      { en: "nervous", es: "nervioso/a", example: "Her voice sounded a little nervous at first." },
      { en: "character", es: "personaje", example: "She started thinking about the character instead." },
      { en: "casting", es: "selección de reparto", example: "The casting assistant called her three days later." },
      { en: "silence", es: "silencio", example: "By the end of the scene, the room was completely silent." },
      { en: "honest", es: "honesto/a", example: "That was very honest, the director said." },
      { en: "doubt", es: "duda", example: "All the doubts had led to this moment." },
      { en: "location", es: "locación", example: "She wanted to walk around the location." },
      { en: "release", es: "estrenar", example: "When the film was finally released, she watched it with her family." }
    ],
    grammarFocus: [
      {
        title: "Past Perfect para eventos anteriores a otro momento pasado",
        explanation: "had + participio se usa para hablar de algo que ya había ocurrido antes de otro momento en el pasado de la historia.",
        pattern: "Subject + had + past participle",
        examples: ["She had read the script more than twenty times.", "She had lost her own job six months earlier.", "She had already proven to herself that she could do it."]
      },
      {
        title: "Past Continuous para acciones en curso en el pasado",
        explanation: "was/were + verbo-ing describe una acción que estaba en progreso en un momento específico del pasado, frecuentemente como fondo de otra acción.",
        pattern: "Subject + was/were + verb-ing",
        examples: ["Some of them were reading their scripts one last time.", "Others were talking quietly, trying to stay calm."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why were Maria's hands shaking when she arrived at the studio?", options: ["She was cold.", "She was very nervous about the audition.", "She had run to get there.", "She was angry."], answer: 1 },
        { type: "mcq", text: "What advice had Maria's acting teacher given her?", options: ["Read the script one more time.", "The character is not you. Trust her.", "Speak louder than usual.", "Arrive early to calm down."], answer: 1 },
        { type: "mcq", text: "True or False: Maria got the role on the same day as the audition.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "Why did Maria understand the character's situation so well?", options: ["She had studied unemployment in school.", "She had lost her own job six months earlier.", "Her sister had lost a job.", "She read about it in the script notes."], answer: 1 },
        { type: "order", text: "Maria performed the scene at the audition / Maria practiced her lines at home / The casting assistant called Maria / Maria arrived early on the first day of filming", answer: "maria practiced her lines at home maria performed the scene at the audition the casting assistant called maria maria arrived early on the first day of filming" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Maria was very ___ before the audition.", answer: "nervous" },
        { type: "mcq", text: "What does \"audition\" mean in this context?", options: ["A formal test where an actor performs for a role", "A written contract", "A film festival", "A rehearsal after filming"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Ella confiaba en el personaje.\"", answer: "She trusted the character." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly describes something that happened before another past action?", options: ["She had practiced her lines before the audition.", "She has practiced her lines before the audition.", "She practiced her lines since months."], answer: 0 },
        { type: "fill-blank", text: "Maria ___ (arrive) at the studio two hours early on her first day of filming.", answer: "arrived" },
        { type: "mcq", text: "Which sentence describes an action in progress at a specific past moment?", options: ["Some of them were reading their scripts.", "Some of them read their scripts yesterday.", "Some of them have read their scripts."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "The character is not you. Trust her, and let her speak." },
        { type: "pronunciation", text: "That was very honest." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"We'll be in touch\" mean?", options: ["We will contact you later.", "We will meet immediately.", "We will call you right now.", "We will send the script today."], answer: 0 },
        { type: "short-answer", text: "Explain in your own words what \"trust her\" means in the context of acting.", answer: "It means believing in the character and performing naturally instead of overthinking." }
      ]
    }
  },

  {
    id: "story-tecnologia-b1",
    area: "tecnologia",
    level: "B1",
    title: "The Bug That Saved the Launch",
    subtitle: "Un desarrollador descubre un error crítico justo antes de un lanzamiento",
    text: `Daniel had been working on the new app for almost a year. The release date was set for Monday morning, and by Friday afternoon, everything looked ready. The team had tested every screen, fixed dozens of small issues, and prepared the final version for the app store.

On Friday evening, most of his colleagues had already left the office. Daniel stayed a little longer, just to check the numbers one more time. He liked to look at the analytics dashboard before a big release, even though there was nothing left to do.

While he was scrolling through the data, he noticed something strange. A small percentage of test users had lost their saved information after updating the app. It wasn't a large number, only about two percent, but it was enough to worry him. He opened the code and started looking for the cause.

At first, he couldn't find anything wrong. The update process looked correct, and the tests had passed without any errors. However, Daniel remembered that some of their users still had very old devices, with an older version of the operating system. He decided to test the update on an older device that had been sitting in a drawer for months.

He connected the old phone, installed the previous version of the app, added some information, and then installed the new update on top of it. As soon as the update finished, the app crashed, and when he opened it again, all the saved data was gone.

Daniel's stomach dropped. If this bug had reached the app store, thousands of users could have lost their data on Monday morning. He immediately called his team lead, even though it was already past nine at night.

"I think we have a serious problem," Daniel said. "The update deletes user data on older devices."

His team lead didn't sound angry. Instead, he sounded relieved. "I'm glad you found it before the release, not after," he said. "Can you identify the root cause tonight?"

Daniel spent the next three hours reading through the update logic line by line. Eventually, he found it: a small function that was supposed to migrate old data to the new format was failing silently on older systems, and instead of showing an error, it was deleting the data by mistake.

By midnight, Daniel had written a fix and tested it again on the old device. This time, the data stayed exactly where it should be. He sent the fix to his team lead, who reviewed it early the next morning and approved it immediately.

The team spent Saturday running additional tests on five different old devices, just to make sure the bug was completely gone. Everything worked correctly. On Monday morning, the app was released on schedule, and nobody outside the company ever knew how close they had come to a disaster.

A week later, during a team meeting, the team lead thanked Daniel in front of everyone. "Most people would have gone home on Friday and checked the dashboard on Monday," he said. "Daniel's habit of double-checking probably saved us from a very bad week."

Daniel smiled, a little embarrassed by the attention. "I just wanted to be sure," he said. "I didn't expect to find anything."

From that day, checking the analytics dashboard before every release became a habit for the entire team, not just for Daniel.`,
    summaryEs: "Daniel descubre, justo antes de un lanzamiento, que una actualización borra datos de usuarios en dispositivos antiguos. Investiga, encuentra la causa raíz, corrige el error a tiempo y el equipo adopta una nueva costumbre de revisión.",
    vocab: [
      { en: "release", es: "lanzamiento / publicar", example: "The release date was set for Monday morning." },
      { en: "dashboard", es: "panel de control", example: "He liked to look at the analytics dashboard before a release." },
      { en: "analytics", es: "analítica de datos", example: "He checked the analytics dashboard one more time." },
      { en: "update", es: "actualización", example: "The update deletes user data on older devices." },
      { en: "crash", es: "fallar / colapsar", example: "The app crashed after the update finished." },
      { en: "root cause", es: "causa raíz", example: "Can you identify the root cause tonight?" },
      { en: "migrate", es: "migrar", example: "The function was supposed to migrate old data to the new format." },
      { en: "fix", es: "corrección", example: "Daniel had written a fix and tested it again." },
      { en: "device", es: "dispositivo", example: "Some users still had very old devices." },
      { en: "silently", es: "silenciosamente", example: "The function was failing silently on older systems." }
    ],
    grammarFocus: [
      {
        title: "Third Conditional (situación hipotética pasada)",
        explanation: "If + past perfect, ... would/could have + participio, se usa para hablar de una consecuencia hipotética de algo que NO ocurrió en el pasado.",
        pattern: "If + subject + had + participle, ... could/would have + participle",
        examples: ["If this bug had reached the app store, thousands of users could have lost their data.", "If we hadn't tested it again, we might not have found the problem."]
      },
      {
        title: "Past Perfect para el contexto previo al problema",
        explanation: "had + participio ubica acciones que ya habían pasado antes del momento central de la historia.",
        pattern: "Subject + had + past participle",
        examples: ["Daniel had been working on the app for almost a year.", "The tests had passed without any errors."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "When did Daniel notice the strange data?", options: ["Monday morning", "Friday evening, while checking analytics", "During the team meeting", "On the old device first"], answer: 1 },
        { type: "mcq", text: "What happened to test users' data after the update?", options: ["It was duplicated.", "It was lost after updating on older devices.", "It became slower to load.", "Nothing happened."], answer: 1 },
        { type: "mcq", text: "True or False: The bug was caused by a data migration function failing silently.", options: ["True", "False"], answer: 0 },
        { type: "mcq", text: "Why did the team lead sound relieved instead of angry?", options: ["He didn't understand the problem.", "The bug was found before the public release.", "The bug was not serious.", "He wasn't at work that night."], answer: 1 },
        { type: "order", text: "Daniel tested the update on an old device / Daniel noticed strange data in the dashboard / The team released the app on Monday / Daniel wrote and tested a fix", answer: "daniel noticed strange data in the dashboard daniel tested the update on an old device daniel wrote and tested a fix the team released the app on monday" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The team reviewed the ___ dashboard before every release from then on.", answer: "analytics" },
        { type: "mcq", text: "What does \"root cause\" mean in this story?", options: ["The main reason something went wrong", "The first user affected", "The name of the bug", "The final test result"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"La aplicación falló después de la actualización.\"", answer: "The app crashed after the update." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence uses the third conditional correctly?", options: ["If this bug had reached the app store, thousands of users could have lost their data.", "If this bug reach the app store, thousands of users lose their data.", "If this bug will reach the app store, users will lose data."], answer: 0 },
        { type: "fill-blank", text: "Daniel ___ (work) on the app for almost a year before the release. (past perfect)", answer: "had worked" },
        { type: "mcq", text: "Which sentence describes an action in progress interrupted by another?", options: ["While he was scrolling through the data, he noticed something strange.", "He scrolled through the data and noticed something.", "He has scrolled through the data."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I think we have a serious problem." },
        { type: "pronunciation", text: "I'm glad you found it before the release, not after." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"Daniel's stomach dropped\" mean?", options: ["He felt sudden fear or shock.", "He was hungry.", "He felt sick from food.", "He fell down."], answer: 0 },
        { type: "short-answer", text: "Explain what it means when the text says the bug \"was failing silently\".", answer: "It means the function did not show any error message even though it was not working correctly." }
      ]
    }
  },

  {
    id: "story-viajes-b1",
    area: "viajes",
    level: "B1",
    title: "A Missed Connection",
    subtitle: "Un vuelo perdido obliga a una viajera a improvisar una nueva ruta",
    text: `Sofia's flight from her home city landed thirty minutes late because of strong winds. She had only fifty minutes to reach her connecting flight, and the airport was much bigger than she had expected.

She ran through the terminal, following the signs toward her next gate, but when she finally arrived, the doors were already closed. The gate agent looked at her ticket and shook her head. "I'm sorry," she said. "The flight has already departed. The doors close ten minutes before departure."

Sofia felt her chest tighten. She was traveling to attend her cousin's wedding, and the ceremony was tomorrow morning. If she missed the next available flight, she might not arrive in time.

She walked to the airline's service counter, where a long line of other passengers were waiting with the same problem. A storm earlier that day had delayed several flights, and many people had missed their connections. Sofia waited almost an hour before an agent could help her.

"The next flight to your destination isn't until tomorrow afternoon," the agent explained. "But there's a flight leaving in two hours to a nearby city. From there, you could take a train, and you would still arrive before the ceremony starts."

Sofia hesitated. She had never traveled through that city before, and she didn't speak the local language very well. Still, it seemed better than waiting an entire day. She agreed, and the agent printed her new tickets.

While she was waiting at the new gate, an older man sitting next to her noticed she looked worried. "First time flying alone?" he asked kindly.

"No," Sofia said, "but I've never had to change my whole trip like this."

The man smiled. "I travel for work every month. Missed connections happen more than people think. The important thing is staying calm and asking for help early."

They talked for the rest of the wait, and the man, whose name was Marco, turned out to be flying to the same nearby city for a business meeting. When they landed, he helped her find the correct train platform and even wrote down the name of her stop in the local language, in case she needed to ask someone for directions.

The train ride took almost three hours. Sofia watched the countryside pass by the window, feeling much calmer than she had at the airport. She arrived at her cousin's city late that night, exhausted but relieved.

The next morning, she told her cousin the whole story before the wedding began. "You must have been so stressed," her cousin said.

"I was," Sofia admitted, "but a stranger at the airport helped me more than I expected. I probably wouldn't have made it without him."

Standing at the back of the small church, watching her cousin get married, Sofia thought about how differently the trip could have ended. If she had panicked instead of asking for help, she might still be sitting in that first airport, waiting for tomorrow's flight.

Before leaving the wedding reception, Sofia sent Marco a short message to thank him again. He replied a few hours later: "Glad it worked out. Safe travels for the rest of your trip."`,
    summaryEs: "Sofia pierde su vuelo de conexión por una tormenta y arriesga llegar tarde a la boda de su prima. Con la ayuda de un viajero experimentado, improvisa una ruta alternativa en tren y llega a tiempo a la ceremonia.",
    vocab: [
      { en: "connection", es: "conexión (de vuelo)", example: "She had only fifty minutes to reach her connecting flight." },
      { en: "gate", es: "puerta de embarque", example: "When she finally arrived, the doors were already closed." },
      { en: "departure", es: "salida", example: "The doors close ten minutes before departure." },
      { en: "delay", es: "retraso", example: "A storm had delayed several flights." },
      { en: "terminal", es: "terminal", example: "She ran through the terminal, following the signs." },
      { en: "platform", es: "andén", example: "He helped her find the correct train platform." },
      { en: "ceremony", es: "ceremonia", example: "The ceremony was tomorrow morning." },
      { en: "exhausted", es: "agotado/a", example: "She arrived late that night, exhausted but relieved." },
      { en: "relieved", es: "aliviado/a", example: "She felt relieved after arriving safely." },
      { en: "stranger", es: "desconocido/a", example: "A stranger at the airport helped me more than I expected." }
    ],
    grammarFocus: [
      {
        title: "Third Conditional para resultados alternativos",
        explanation: "If + past perfect, ... might/could + verbo, para imaginar cómo habría sido el resultado si algo hubiera pasado diferente.",
        pattern: "If + subject + had + participle, ... might/could + verb",
        examples: ["If she had panicked instead of asking for help, she might still be sitting in that airport.", "If she hadn't met Marco, the trip could have ended very differently."]
      },
      {
        title: "Past Perfect para experiencias previas al viaje",
        explanation: "had + participio para hablar de experiencias o hechos anteriores al momento central de la historia.",
        pattern: "Subject + had + past participle",
        examples: ["She had never traveled through that city before.", "A storm had delayed several flights earlier that day."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why was Sofia's flight delayed?", options: ["Strong winds", "A mechanical problem", "A missing passenger", "Bad traffic"], answer: 0 },
        { type: "mcq", text: "What event was Sofia trying to reach on time?", options: ["A business meeting", "Her cousin's wedding", "A flight training", "A job interview"], answer: 1 },
        { type: "mcq", text: "True or False: Sofia decided to wait at the airport until the next day's flight.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Marco from the story?", options: ["He was a nervous traveler.", "He was an experienced traveler who often flew for work.", "He worked at the airport.", "He was also going to the wedding."], answer: 1 },
        { type: "order", text: "Sofia missed her connecting flight / Sofia talked with Marco at the gate / Sofia took a train to her cousin's city / Sofia thanked Marco after the wedding", answer: "sofia missed her connecting flight sofia talked with marco at the gate sofia took a train to her cousin's city sofia thanked marco after the wedding" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The gate agent said the flight had already ___.", answer: "departed" },
        { type: "mcq", text: "What does \"exhausted\" mean?", options: ["Very tired", "Very happy", "Very confused", "Very late"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Perdí mi vuelo de conexión.\"", answer: "I missed my connecting flight." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence is a correct third conditional?", options: ["If she had panicked, she might still be sitting at that airport.", "If she panicked, she still sits at that airport.", "If she will panic, she will still sit there."], answer: 0 },
        { type: "fill-blank", text: "Sofia ___ (never / travel) through that city before. (past perfect)", answer: "had never traveled" },
        { type: "mcq", text: "Which sentence shows past continuous?", options: ["Sofia was waiting at the new gate when Marco spoke to her.", "Sofia waited at the gate.", "Sofia has waited at the gate."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I'm sorry, the flight has already departed." },
        { type: "pronunciation", text: "Missed connections happen more than people think." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"it worked out\" mean in Marco's message?", options: ["Something exercised well.", "The situation ended well despite the difficulties.", "Something was repaired.", "A schedule was created."], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Sofia felt \"much calmer\" on the train than at the airport.", answer: "Because the stressful situation was already resolved and she knew she would arrive on time." }
      ]
    }
  },

  {
    id: "story-vidacotidiana-b1",
    area: "vidacotidiana",
    level: "B1",
    title: "The Sunday Market",
    subtitle: "Una rutina familiar cambia cuando el hermano menor decide aprender a cocinar",
    text: `Every Sunday morning, Elena's family walked to the small market near their house. It was a tradition that had started when Elena was a child, and even now, as an adult with her own apartment, she always came back to join her parents.

The market opened early, and the best vegetables usually disappeared by mid-morning. Elena's mother liked to arrive first, before most other people, so she could choose the freshest tomatoes and the ripest fruit. Elena's father, on the other hand, preferred to walk around slowly, talking to the same sellers he had known for years.

This Sunday was different. Elena's younger brother, Tomas, had recently started cooking more at home, and he had insisted on coming with them for the first time in months. He wanted to buy ingredients for a recipe he had found online, something with vegetables Elena's mother had never used before.

"I don't think we need any of this," their mother said, looking at Tomas's list with confusion. "We already have everything we need for dinner."

"This is for a different dish," Tomas explained. "I want to try something new."

Their mother sighed but didn't argue. She was secretly happy that Tomas was finally interested in cooking, even if she didn't understand his recipe. They walked together through the market, stopping at different stalls. Tomas asked questions about vegetables he had never bought before, and one of the older sellers, who had known the family for over twenty years, patiently explained how to choose and prepare each one.

By the time they finished shopping, their bags were much heavier than usual. Elena offered to carry the extra bag with Tomas's vegetables, and the four of them walked home slowly, talking about the week ahead.

That evening, Tomas cooked for the whole family for the first time. He was nervous in the kitchen, checking his phone constantly to follow the recipe correctly. Elena helped him chop the vegetables, while their parents sat at the table, curious about what their son was preparing.

The final dish wasn't perfect. Tomas had added too much salt, and one of the vegetables was slightly undercooked. Still, everyone finished their plates, and their father asked for a second small portion.

"It's not bad for a first try," their mother admitted, smiling.

"Not bad at all," their father agreed. "Maybe next Sunday, you can come to the market with a shorter list."

Tomas laughed. "Maybe. Or maybe I'll find an even longer one."

After dinner, while washing the dishes together, Elena told her brother that their mother had already started planning what to buy for his next attempt. "She's not going to admit it, but she's excited," Elena said.

From that Sunday on, Tomas joined the family at the market almost every week. Sometimes his dishes turned out well, and sometimes they didn't, but the market visits became something the whole family looked forward to, not just a routine anymore.`,
    summaryEs: "La rutina semanal de ir al mercado cambia cuando Tomas, el hermano menor, decide aprender a cocinar y se une a la familia por primera vez en meses. Su primer plato no es perfecto, pero la experiencia acerca a toda la familia.",
    vocab: [
      { en: "market", es: "mercado", example: "Every Sunday morning, the family walked to the small market." },
      { en: "stall", es: "puesto (de mercado)", example: "They walked together through the market, stopping at different stalls." },
      { en: "ingredient", es: "ingrediente", example: "He wanted to buy ingredients for a new recipe." },
      { en: "recipe", es: "receta", example: "He wanted to follow the recipe correctly." },
      { en: "undercooked", es: "poco cocido", example: "One of the vegetables was slightly undercooked." },
      { en: "tradition", es: "tradición", example: "It was a tradition that had started when Elena was a child." },
      { en: "curious", es: "curioso/a", example: "Their parents sat at the table, curious about the dish." },
      { en: "portion", es: "porción", example: "Their father asked for a second small portion." },
      { en: "chop", es: "picar / cortar", example: "Elena helped him chop the vegetables." },
      { en: "sigh", es: "suspirar", example: "Their mother sighed but didn't argue." }
    ],
    grammarFocus: [
      {
        title: "Past Perfect para explicar rutinas y decisiones previas",
        explanation: "had + participio se usa para explicar algo que ya había comenzado o sucedido antes del momento principal de la historia.",
        pattern: "Subject + had + past participle",
        examples: ["It was a tradition that had started when Elena was a child.", "Tomas had recently started cooking more at home."]
      },
      {
        title: "While + past continuous para acciones simultáneas",
        explanation: "\"While\" conecta dos acciones que ocurren al mismo tiempo en el pasado; una suele estar en past continuous.",
        pattern: "..., while + subject + was/were + verb-ing",
        examples: ["Elena helped him chop the vegetables, while their parents sat at the table.", "While washing the dishes together, Elena told her brother the news."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What was different about this Sunday's market visit?", options: ["The market was closed.", "Tomas joined them for the first time in months.", "They didn't buy vegetables.", "It rained."], answer: 1 },
        { type: "mcq", text: "Why did Tomas want unusual ingredients?", options: ["He was following a new recipe he found online.", "His mother asked him to.", "The seller recommended them.", "He wanted to save money."], answer: 0 },
        { type: "mcq", text: "True or False: The final dish Tomas cooked was perfect.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about the mother's reaction to Tomas cooking?", options: ["She was annoyed and didn't want him to continue.", "She was secretly happy even though she complained a little.", "She refused to eat his food.", "She didn't care at all."], answer: 1 },
        { type: "order", text: "Tomas asked to join the market trip / The family shopped for ingredients / Tomas cooked dinner for the family / Tomas joined the market almost every week", answer: "tomas asked to join the market trip the family shopped for ingredients tomas cooked dinner for the family tomas joined the market almost every week" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Elena's mother liked to arrive early to choose the freshest ___ and fruit.", answer: "tomatoes" },
        { type: "mcq", text: "What does \"undercooked\" mean?", options: ["Cooked for too long", "Not cooked enough", "Cooked with too much salt", "Cooked perfectly"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Vamos al mercado todos los domingos.\"", answer: "We go to the market every Sunday." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the past perfect for a routine that began earlier?", options: ["It was a tradition that had started when Elena was a child.", "It was a tradition that starts when Elena was a child.", "It is a tradition that had start when Elena was a child."], answer: 0 },
        { type: "fill-blank", text: "Their mother ___ (secretly / be) happy that Tomas was cooking.", answer: "was secretly" },
        { type: "mcq", text: "Which sentence uses \"while\" correctly with two actions happening at the same time?", options: ["Elena helped him chop the vegetables while their parents sat at the table.", "Elena helped him chop the vegetables while their parents sit at the table.", "Elena help him chop the vegetables while their parents sat."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "It's not bad for a first try." },
        { type: "pronunciation", text: "Maybe next Sunday, you can come with a shorter list." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"looked forward to\" mean at the end of the story?", options: ["Felt worried about something", "Felt excited and happy about something coming in the future", "Looked at something directly", "Forgot about something"], answer: 1 },
        { type: "short-answer", text: "Explain why the market visits \"became something the whole family looked forward to\".", answer: "Because they started spending meaningful time together and Tomas's cooking made the routine more special than before." }
      ]
    }
  },

  {
    id: "story-proyectos-b1",
    area: "proyectos",
    level: "B1",
    projectId: "core-project",
    title: "The Weekend Deployment",
    subtitle: "Un equipo técnico detecta y resuelve un problema durante un despliegue de fin de semana",
    text: `The team had planned the deployment for Saturday morning, when very few users would be active on the platform. Everything had been tested during the week, and the release plan had been reviewed twice by two different engineers.

Carla arrived at her laptop at seven in the morning, ready to start. The deployment window was only two hours long, and the team wanted to finish with plenty of time to confirm that everything was working correctly before Monday.

The first part of the deployment went smoothly. The new version was installed on the servers without any errors, and the automated tests passed one after another. For almost forty minutes, everything looked exactly as expected.

Then, one of the monitoring alerts turned red. A small number of transactions were failing, and the error rate was slowly increasing. Carla immediately opened the logs and started reviewing what had changed in the latest release.

She called two other engineers, and within minutes, the three of them were reviewing the same information together. "It looks like the new validation rule is rejecting some valid requests," one of them said. "The rule works for most cases, but not for this specific format."

Carla felt the pressure building. If they didn't fix this quickly, the issue could affect real users once the platform became busier later in the day. They had two options: try to fix the validation rule immediately, or roll back to the previous version while they investigated further.

"We should roll back first," Carla decided. "We can analyze the root cause afterward, without the pressure of live errors."

The rollback took only a few minutes. As soon as the previous version was active again, the error rate returned to normal. Carla felt herself relax for the first time since the alert appeared.

For the rest of the morning, the team focused on understanding exactly what had caused the problem. They discovered that the new validation rule hadn't been tested with one particular type of request, one that was rare but still valid. The test data they had used during the week simply hadn't included that case.

By early afternoon, Carla had prepared a corrected version of the rule, and another engineer had written a new test case specifically for the situation they had missed. They ran the updated tests multiple times, and everything passed without any issues.

Rather than deploying again immediately, the team decided to wait until the following Saturday. "We already have a stable version running," Carla explained during the team meeting. "There's no reason to take unnecessary risk today."

The next Saturday, the corrected deployment went exactly as planned. The validation rule worked correctly for every type of request, and the monitoring dashboard stayed calm and green for the entire day.

During the retrospective meeting the following week, the team agreed to add more variety to their test data in the future, so that rare cases wouldn't be missed again. Carla also suggested keeping someone available to monitor every deployment for at least an hour afterward, exactly as they had done that Saturday.

"It wasn't a perfect deployment," Carla said, "but catching the problem early and rolling back calmly made all the difference."`,
    summaryEs: "Durante un despliegue de fin de semana, el equipo de Carla detecta un aumento de errores causado por una nueva regla de validación. Deciden revertir a la versión anterior, investigan la causa raíz con calma, corrigen el problema y despliegan exitosamente la semana siguiente.",
    vocab: [
      { en: "deployment", es: "despliegue", example: "The team had planned the deployment for Saturday morning." },
      { en: "rollback", es: "reversión", example: "We should roll back first, Carla decided." },
      { en: "validation", es: "validación", example: "The new validation rule is rejecting some valid requests." },
      { en: "monitoring", es: "monitoreo", example: "One of the monitoring alerts turned red." },
      { en: "transaction", es: "transacción", example: "A small number of transactions were failing." },
      { en: "error rate", es: "tasa de error", example: "The error rate was slowly increasing." },
      { en: "root cause", es: "causa raíz", example: "They could analyze the root cause afterward." },
      { en: "retrospective", es: "retrospectiva", example: "During the retrospective meeting, the team agreed on changes." },
      { en: "alert", es: "alerta", example: "One of the monitoring alerts turned red." },
      { en: "stable", es: "estable", example: "We already have a stable version running." }
    ],
    grammarFocus: [
      {
        title: "Second/Third Conditional para evaluar riesgo",
        explanation: "If + pasado / past perfect, ... could/would + verbo, se usa para explicar consecuencias posibles de una decisión técnica.",
        pattern: "If + subject + past simple/past perfect, ... could/would + verb",
        examples: ["If they didn't fix this quickly, the issue could affect real users.", "If they had deployed again immediately, they might have introduced a new risk."]
      },
      {
        title: "Past Perfect Passive para procesos ya completados",
        explanation: "had been + participio describe un proceso que ya se había completado antes del momento central de la historia, en voz pasiva.",
        pattern: "Subject + had been + past participle",
        examples: ["Everything had been tested during the week.", "The release plan had been reviewed twice."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "When was the deployment scheduled?", options: ["Friday night", "Saturday morning", "Monday morning", "Sunday afternoon"], answer: 1 },
        { type: "mcq", text: "What problem appeared during the deployment?", options: ["The servers went offline.", "A validation rule was rejecting some valid requests.", "The team lost the release plan.", "Users could not log in at all."], answer: 1 },
        { type: "mcq", text: "True or False: The team decided to fix the validation rule immediately during the live deployment.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "Why did the team choose to roll back instead of fixing the rule immediately?", options: ["It was faster and removed the pressure of live errors.", "They didn't know how to fix it.", "The rule was not important.", "Rolling back was required by policy."], answer: 0 },
        { type: "order", text: "The team noticed a monitoring alert / The team rolled back to the previous version / The team analyzed the root cause / The team deployed the corrected version the next Saturday", answer: "the team noticed a monitoring alert the team rolled back to the previous version the team analyzed the root cause the team deployed the corrected version the next saturday" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The ___ rate was slowly increasing after the deployment.", answer: "error" },
        { type: "mcq", text: "What does \"rollback\" mean in this context?", options: ["Returning to the previous working version", "Testing a new feature", "Deleting all user data", "Restarting the servers"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Necesitamos identificar la causa raíz del problema.\"", answer: "We need to identify the root cause of the problem." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence is a correct conditional about risk?", options: ["If they didn't fix this quickly, the issue could affect real users.", "If they don't fixed this quickly, the issue affect users.", "If they will not fix this, issue affects users."], answer: 0 },
        { type: "fill-blank", text: "Everything ___ (test) during the week before the deployment. (past perfect passive)", answer: "had been tested" },
        { type: "mcq", text: "Which sentence uses past perfect correctly to explain a missed test case?", options: ["The test data they had used simply hadn't included that case.", "The test data they used simply not include that case.", "The test data they have used didn't included that case."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "We should roll back first." },
        { type: "pronunciation", text: "It wasn't a perfect deployment, but catching the problem early made all the difference." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"catching the problem early\" mean?", options: ["Finding a problem soon, before it causes bigger issues", "Physically catching an object", "Solving a problem completely", "Ignoring a small issue"], answer: 0 },
        { type: "short-answer", text: "Explain in your own words why the team decided to wait until the following Saturday to deploy again.", answer: "Because they already had a stable version running and didn't want to take unnecessary risk by rushing the corrected deployment." }
      ]
    }
  },

  // -------------------------------------------------------------- A2 wave --

  {
    id: "story-cine-a2",
    area: "cine",
    level: "A2",
    title: "A Trip to the Cinema",
    subtitle: "Dos hermanos pasan una tarde de sábado en el cine",
    text: `On Saturday afternoon, Laura and her little brother Nico decided to go to the cinema. They didn't have any plans, so it seemed like a good idea. Laura checked her phone and found three movies playing at the mall near their house.

"Which one do you want to watch?" Laura asked.

"I want to watch the new adventure movie!" Nico said. "It has dinosaurs."

Laura smiled. Nico always liked movies with dinosaurs, robots, or superheroes. She preferred romantic comedies, but today she decided to let her brother choose.

They arrived at the cinema at four o'clock. There was a long line at the ticket counter because it was the weekend. While they waited, Nico looked at all the posters on the wall. He pointed at almost every one.

"Can we watch that one next week?" he asked, pointing at a poster with a superhero.

"Maybe," Laura answered. "Let's watch this one first."

When they finally bought their tickets, they also bought popcorn and two drinks. Nico wanted a large popcorn, but Laura said a medium one was enough for both of them. They found their seats in row twelve, near the middle of the theater.

The movie started a few minutes later. It was loud and colorful, with lots of action. Nico laughed at the funny parts and covered his eyes during the scary parts. Laura enjoyed it more than she expected. The story was simple, but the characters were interesting, and the dinosaurs looked very real.

After the movie finished, they walked out of the theater talking about their favorite scenes.

"That was amazing!" Nico said. "My favorite part was when the dinosaur ran through the city."

"I liked the ending," Laura said. "It was funny and a little sad at the same time."

On their way out, they stopped at a small gift shop near the exit. The shop sold toys, posters, and small figures from different movies. Nico saw a toy dinosaur from the film they had just watched, and his eyes got very big.

"Can I have this one? Please?" he asked, holding the toy carefully.

Laura checked the price. It wasn't too expensive, so she agreed. Nico thanked her three times and held the toy dinosaur for the rest of the evening. He even put it on the table while they ate dinner.

They walked to a small restaurant near the cinema and ordered dinner. Nico talked about the movie during the whole meal. He wanted to watch it again the next weekend.

"We can't watch it every weekend," Laura said, laughing.

"Why not?" Nico asked.

"Because there are other movies too," she explained. "Maybe we can watch the superhero movie next time."

Nico agreed. He was already excited about their next trip to the cinema. Before they went home, Laura took a photo of the two of them in front of the cinema entrance. She wanted to remember their afternoon together.

That night, Nico told their parents everything about the movie. He talked about the dinosaurs, the funny character, and the big final scene. Their parents listened and smiled. It was clear that Nico had a wonderful time, and Laura was happy she let him choose the movie.`,
    summaryEs: "Laura lleva a su hermano menor Nico al cine un sábado. Aunque ella prefiere otro tipo de películas, deja que él elija una de dinosaurios y ambos disfrutan la tarde juntos.",
    vocab: [
      { en: "cinema", es: "cine", example: "They decided to go to the cinema." },
      { en: "ticket", es: "boleto", example: "They bought their tickets." },
      { en: "line", es: "fila", example: "There was a long line at the counter." },
      { en: "popcorn", es: "palomitas", example: "They bought popcorn and two drinks." },
      { en: "seat", es: "asiento", example: "They found their seats in row twelve." },
      { en: "scene", es: "escena", example: "They talked about their favorite scenes." },
      { en: "funny", es: "divertido/a", example: "He laughed at the funny parts." },
      { en: "scary", es: "de miedo", example: "He covered his eyes during the scary parts." },
      { en: "favorite", es: "favorito/a", example: "What was your favorite part?" },
      { en: "ending", es: "final", example: "I liked the ending." }
    ],
    grammarFocus: [
      {
        title: "Past Simple para narrar una secuencia de eventos",
        explanation: "Se usa el pasado simple para contar acciones que ocurrieron una después de otra en el pasado.",
        pattern: "Subject + verb-ed / irregular past",
        examples: ["They arrived at the cinema at four o'clock.", "They bought their tickets and found their seats.", "The movie started a few minutes later."]
      },
      {
        title: "Present Simple para gustos y hábitos",
        explanation: "El presente simple describe gustos generales o cosas que siempre son ciertas sobre alguien.",
        pattern: "Subject + verb (+s for he/she/it)",
        examples: ["Nico always likes movies with dinosaurs.", "Laura prefers romantic comedies."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why did Laura and Nico decide to go to the cinema?", options: ["They had tickets already", "They didn't have any plans", "Their parents told them to go", "It was Nico's birthday"], answer: 1 },
        { type: "mcq", text: "Which movie did Nico want to watch?", options: ["A romantic comedy", "An adventure movie with dinosaurs", "A superhero movie", "A cartoon"], answer: 1 },
        { type: "mcq", text: "True or False: There was no line at the ticket counter.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Laura?", options: ["She doesn't like spending time with her brother", "She let Nico choose the movie even though she prefers different movies", "She hates dinosaur movies", "She refused to buy popcorn"], answer: 1 },
        { type: "order", text: "They bought popcorn and drinks / They arrived at the cinema / They watched the movie / They had dinner and talked about the movie", answer: "they arrived at the cinema they bought popcorn and drinks they watched the movie they had dinner and talked about the movie" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "There was a long ___ at the ticket counter.", answer: "line" },
        { type: "mcq", text: "What does \"scary\" mean?", options: ["Something that makes you laugh", "Something that makes you feel afraid", "Something that is very boring", "Something that is very colorful"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Encontraron sus asientos.\"", answer: "They found their seats." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses Past Simple?", options: ["They arrived at the cinema at four o'clock.", "They arrive at the cinema at four o'clock.", "They arriving at the cinema at four o'clock."], answer: 0 },
        { type: "fill-blank", text: "Nico always ___ (like) movies with dinosaurs.", answer: "likes" },
        { type: "mcq", text: "Which question correctly asks about the past?", options: ["Did you like the movie?", "Do you liked the movie?", "Are you liked the movie?"], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Can we watch that one next week?" },
        { type: "pronunciation", text: "That was amazing!" }
      ],
      expressions: [
        { type: "mcq", text: "What does \"It was clear that Nico had a wonderful time\" mean?", options: ["Nobody could tell how Nico felt", "It was obvious that Nico enjoyed himself", "Nico was confused", "Nico wanted to leave early"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Laura let Nico choose the movie.", answer: "Because she wanted her brother to be happy and decided to let him pick the movie that day." }
      ]
    }
  },

  {
    id: "story-tecnologia-a2",
    area: "tecnologia",
    level: "A2",
    title: "My New Phone",
    subtitle: "Marco configura su teléfono nuevo con la ayuda de una amiga",
    text: `Marco bought a new phone last weekend. His old phone was very slow, and the screen had a big crack. He was excited to use the new one, but he didn't know how to set it up.

He opened the box and looked at the phone. It was black and very light. He pressed the power button, and the screen turned on immediately. A message appeared: "Welcome! Let's set up your phone."

Marco followed the instructions step by step. First, he connected to the Wi-Fi at home. Then, he created a new account with his email address. The phone asked him to choose a password. He typed a strong password and confirmed it.

Next, the phone asked if he wanted to copy his information from his old phone. Marco said yes, because he didn't want to lose his photos and contacts. The process took almost twenty minutes. He watched a progress bar move slowly across the screen.

While he waited, Marco called his friend Ana. She always knew a lot about new technology.

"I'm setting up my new phone," he said. "It's taking a long time."

"That's normal," Ana said. "It's copying all your data. Don't turn it off."

"Okay, I won't," Marco said. "Do you know how to change the language?"

"Yes, it's easy," Ana explained. "Go to Settings, then General, then Language."

Marco followed her instructions and found the option quickly. He also changed the wallpaper and organized his apps into folders. He put all his games in one folder and his work apps in another.

Marco also explored the phone's camera settings. There were many options he didn't understand, like different modes for night photos and portraits. He decided to try the portrait mode first. He took a photo of a plant on his kitchen table, and the background looked soft and blurry, just like in professional photos.

He was surprised by how easy everything was becoming. A few hours earlier, he didn't know how to change the language, and now he was using advanced camera features. He felt proud of himself for learning so quickly, even without reading a manual.

After an hour, the phone was ready. Marco tested the camera first. He took a photo of his cat sleeping on the sofa. The picture looked much better than the photos from his old phone.

Then he tried the new features. The phone had a better battery, a faster camera, and more storage space. He downloaded his favorite apps and logged into his social media accounts.

That evening, Marco sent a message to Ana. "Thank you for your help," he wrote. "I love my new phone!"

"You're welcome," Ana replied. "Now you can finally stop complaining about your old phone."

Marco laughed when he read her message. His old phone was in a drawer now, but he decided to keep it just in case. His new phone worked perfectly, and he was ready to use it every day.`,
    summaryEs: "Marco compra un teléfono nuevo y, con la ayuda telefónica de su amiga Ana, logra configurarlo, transferir sus datos y aprender sus nuevas funciones.",
    vocab: [
      { en: "screen", es: "pantalla", example: "The screen had a big crack." },
      { en: "crack", es: "grieta", example: "The screen had a big crack." },
      { en: "password", es: "contraseña", example: "He typed a strong password." },
      { en: "settings", es: "configuración", example: "Go to Settings, then General." },
      { en: "battery", es: "batería", example: "The phone had a better battery." },
      { en: "storage", es: "almacenamiento", example: "The phone had more storage space." },
      { en: "wallpaper", es: "fondo de pantalla", example: "He changed the wallpaper." },
      { en: "folder", es: "carpeta", example: "He organized his apps into folders." },
      { en: "download", es: "descargar", example: "He downloaded his favorite apps." },
      { en: "account", es: "cuenta", example: "He created a new account." }
    ],
    grammarFocus: [
      {
        title: "Present Continuous para acciones en curso",
        explanation: "is/are + verbo-ing describe algo que está pasando en este momento.",
        pattern: "Subject + is/are + verb-ing",
        examples: ["I'm setting up my new phone.", "It's taking a long time."]
      },
      {
        title: "Past Simple para contar lo que hizo",
        explanation: "Se usa para describir acciones completadas en el pasado, en orden.",
        pattern: "Subject + verb-ed",
        examples: ["Marco bought a new phone last weekend.", "He opened the box and looked at the phone."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why was Marco excited about his new phone?", options: ["His old phone had a big crack and was very slow", "He won it in a contest", "His friend gave it to him", "It was a gift from his job"], answer: 0 },
        { type: "mcq", text: "Who helped Marco set up his phone?", options: ["His mother", "His friend Ana, by phone", "A store employee", "His brother"], answer: 1 },
        { type: "mcq", text: "True or False: Marco threw away his old phone.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Ana?", options: ["She doesn't understand technology", "She knows a lot about technology and helped him easily", "She was also setting up a new phone", "She refused to help him"], answer: 1 },
        { type: "order", text: "Marco connected to Wi-Fi / Marco called Ana for help / Marco tested the camera / Marco sent Ana a thank-you message", answer: "marco connected to wi-fi marco called ana for help marco tested the camera marco sent ana a thank-you message" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "He typed a strong ___ and confirmed it.", answer: "password" },
        { type: "mcq", text: "What does \"storage space\" mean on a phone?", options: ["How loud the phone is", "How much information the phone can save", "How fast the phone charges", "How big the screen is"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Creó una cuenta nueva.\"", answer: "He created a new account." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence uses Present Continuous correctly?", options: ["I'm setting up my new phone.", "I setting up my new phone.", "I am set up my new phone."], answer: 0 },
        { type: "fill-blank", text: "Marco ___ (buy) a new phone last weekend.", answer: "bought" },
        { type: "mcq", text: "Which sentence is Past Simple?", options: ["He opened the box and looked at the phone.", "He is opening the box.", "He opens the box every day."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Thank you for your help. I love my new phone!" },
        { type: "pronunciation", text: "Don't turn it off." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"just in case\" mean when Marco keeps his old phone?", options: ["He is sure he will need it tomorrow", "He keeps it as a precaution, even if unlikely to need it", "He forgot to throw it away", "He wants to sell it"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Marco decided to keep his old phone.", answer: "He wanted to keep it just in case something happened to his new phone, even though his new phone worked well." }
      ]
    }
  },

  {
    id: "story-viajes-a2",
    area: "viajes",
    level: "A2",
    title: "Packing for the Trip",
    subtitle: "Sara empaca su maleta para un viaje a la playa y casi olvida algo importante",
    text: `Sara was going on a trip to the beach with her family. The trip started early the next morning, so she needed to pack her suitcase tonight. She wasn't very good at packing, and she always forgot something important.

She put her suitcase on the bed and opened it. First, she packed her clothes: three t-shirts, two shorts, a dress, and a light jacket for the evenings. She also packed her swimsuit because the hotel had a big pool.

"Don't forget your sunscreen," her mother said from the door. "The sun is very strong at the beach."

"I know, Mom," Sara answered. "I already packed it."

Sara continued packing. She added her toothbrush, her shampoo, and a small bag with her makeup. She also packed a book to read on the plane and her headphones for the flight.

She also thought about the weather. The forecast said it would be sunny most days, but there was a small chance of rain on the last day. Just in case, she packed a small umbrella at the bottom of the suitcase, folded next to her shoes.

Her little sister, Emma, walked into the room while Sara was packing. "Can I help?" Emma asked.

"Sure," Sara said. "Can you find my sandals? I think they're under the bed."

Emma looked under the bed and found the sandals, along with a missing sock Sara had been looking for all week. Sara laughed and added both to the suitcase.

When she finished, she looked at her suitcase. It looked full, but something felt wrong. She checked her list again: clothes, shoes, sunscreen, toothbrush, book... Then she realized her mistake.

"Mom! I forgot my phone charger!" she shouted.

Her mother laughed. "You always forget something," she said. "Check under your desk. I think it's still there from last night."

Sara found the charger and added it to her suitcase. She also remembered her passport and her wallet, which were still on the kitchen table. She put them in her backpack instead of her suitcase, because she wanted to keep them close during the flight.

The next morning, the family woke up very early. They put all the suitcases in the car and drove to the airport. At the check-in counter, an employee weighed Sara's suitcase.

"Your suitcase is a little heavy," the employee said. "You need to remove something, or you can pay extra."

Sara opened her suitcase in front of everyone. She looked through her clothes and decided to remove one pair of shoes. She didn't really need three pairs for a short trip.

After that, everything was fine. The family walked to the gate and waited for their flight. While they waited, Sara bought a bottle of water and a magazine to read during the trip. Sara felt excited. She loved the beach, and she couldn't wait to see the ocean again.

During the flight, she read her book and listened to music. When the plane landed, she looked out the window and saw the blue water in the distance. She smiled, happy that she had remembered almost everything for the trip.`,
    summaryEs: "Sara empaca su maleta para un viaje familiar a la playa. Casi olvida su cargador, y en el aeropuerto debe sacar un par de zapatos porque la maleta pesa demasiado, pero al final llega feliz a su destino.",
    vocab: [
      { en: "suitcase", es: "maleta", example: "She put her suitcase on the bed." },
      { en: "pack", es: "empacar", example: "She needed to pack her suitcase." },
      { en: "sunscreen", es: "protector solar", example: "Don't forget your sunscreen." },
      { en: "charger", es: "cargador", example: "I forgot my phone charger!" },
      { en: "passport", es: "pasaporte", example: "She remembered her passport." },
      { en: "flight", es: "vuelo", example: "She read her book on the flight." },
      { en: "gate", es: "puerta de embarque", example: "They waited for their flight at the gate." },
      { en: "weigh", es: "pesar", example: "An employee weighed Sara's suitcase." },
      { en: "remove", es: "quitar / sacar", example: "She decided to remove one pair of shoes." },
      { en: "heavy", es: "pesado/a", example: "Your suitcase is a little heavy." }
    ],
    grammarFocus: [
      {
        title: "Past Simple con verbos irregulares",
        explanation: "Muchos verbos comunes tienen formas irregulares en pasado (find→found, forget→forgot, put→put).",
        pattern: "Subject + irregular past form",
        examples: ["She found her keys.", "She forgot her charger.", "She put her suitcase on the bed."]
      },
      {
        title: "Adjetivos posesivos y pronombres de objeto",
        explanation: "Se usan para referirse a personas u objetos ya mencionados sin repetir el nombre.",
        pattern: "her/his/their + noun; him/her/them",
        examples: ["Sara packed her clothes.", "Her mother helped her.", "She put them in her backpack."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why did Sara need to pack her suitcase that night?", options: ["The trip started early the next morning", "She wanted to practice packing", "Her mother asked her to", "She was moving to a new house"], answer: 0 },
        { type: "mcq", text: "What did Sara forget at first?", options: ["Her passport", "Her phone charger", "Her swimsuit", "Her sunscreen"], answer: 1 },
        { type: "mcq", text: "True or False: Sara's suitcase was too heavy at the airport.", options: ["True", "False"], answer: 0 },
        { type: "mcq", text: "What can we infer about Sara?", options: ["She always packs perfectly", "She sometimes forgets things when she packs", "She never travels", "She dislikes the beach"], answer: 1 },
        { type: "order", text: "Sara packed her clothes / Sara remembered her charger / An employee weighed her suitcase / Sara saw the ocean from the plane", answer: "sara packed her clothes sara remembered her charger an employee weighed her suitcase sara saw the ocean from the plane" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Don't forget your ___. The sun is very strong at the beach.", answer: "sunscreen" },
        { type: "mcq", text: "What does \"weigh\" mean at the airport?", options: ["To check how heavy something is", "To check a passport", "To buy a ticket", "To find a gate"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Ella empacó su maleta.\"", answer: "She packed her suitcase." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence uses the correct irregular past form?", options: ["She find her keys.", "She found her keys.", "She finded her keys."], answer: 1 },
        { type: "fill-blank", text: "She ___ (forget) her charger, but she found it under the desk.", answer: "forgot" },
        { type: "mcq", text: "Which sentence uses a possessive adjective correctly?", options: ["Sara packed her clothes.", "Sara packed she clothes.", "Sara packed hers clothes."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I forgot my phone charger!" },
        { type: "pronunciation", text: "Your suitcase is a little heavy." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"in the distance\" mean?", options: ["Very close", "Far away, but visible", "Underground", "Inside the plane"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Sara felt happy when the plane landed.", answer: "Because she could finally see the ocean and she was excited to be at the beach again, even though she almost forgot some things." }
      ]
    }
  },

  {
    id: "story-vidacotidiana-a2",
    area: "vidacotidiana",
    level: "A2",
    title: "A Busy Morning",
    subtitle: "Una mañana caótica pone a prueba la rutina de Ana antes del trabajo",
    text: `Every weekday, Ana wakes up at six thirty in the morning. She doesn't like waking up early, but she needs time to get ready before work. This morning, everything went wrong from the beginning.

First, her alarm didn't ring. She woke up at seven o'clock instead of six thirty, and she only had thirty minutes to get ready. She jumped out of bed and ran to the bathroom.

"I'm late! I'm late!" she said to herself.

She took a very fast shower and got dressed quickly. She chose the first shirt she found in her closet, even though it didn't match her pants very well. There was no time to think about it.

In the kitchen, Ana tried to make breakfast, but she was in too much of a hurry. She put bread in the toaster and made a cup of coffee. While she waited, she looked for her keys, but she couldn't find them anywhere.

"Where are my keys?" she said, looking under some papers on the table.

Her roommate, Diego, walked into the kitchen and saw her looking everywhere.

"Are you looking for your keys?" he asked. "I saw them on the sofa yesterday."

Ana ran to the living room and found her keys under a pillow on the sofa. She grabbed them and went back to the kitchen. The toast was ready, but she didn't have time to eat it there. She wrapped it in a napkin and put it in her bag.

She grabbed her coffee, her bag, and her phone, and she said goodbye to Diego. She walked very fast to the bus stop, hoping the bus wasn't there yet. When she arrived, she saw the bus was still waiting.

"Perfect timing," she thought, and she got on the bus just in time.

During the bus ride, Ana finally ate her toast and drank her coffee. She looked at her reflection in the window and noticed her shirt didn't match her pants at all. She laughed quietly to herself. It wasn't the best morning, but at least she wasn't late for work.

When she arrived at the office, her coworker Lucia noticed she looked tired.

"Rough morning?" Lucia asked.

"You have no idea," Ana said, and she told her the whole story.

Lucia laughed. "Tomorrow will be better," she said.

During her lunch break, Ana called her mother to tell her about the crazy morning. Her mother laughed so hard that Ana could hear her clearly through the phone.

"You always have these mornings," her mother said. "Remember when you left the house without your shoes?"

"That was different!" Ana said, laughing too. "I was twelve years old."

"Still funny," her mother replied.

After lunch, Ana felt much better. The stress from the morning was gone, and she even found the story a little funny herself now. She sent Diego a message to thank him for helping her find her keys, and he replied with a laughing emoji.

Ana hoped so. She decided that tonight, she would set two alarms instead of one, just to be safe.`,
    summaryEs: "El despertador de Ana no suena y su mañana se llena de contratiempos: no encuentra sus llaves, casi pierde el autobús y llega al trabajo con la ropa sin combinar, pero logra llegar a tiempo.",
    vocab: [
      { en: "alarm", es: "alarma", example: "Her alarm didn't ring." },
      { en: "hurry", es: "prisa / apuro", example: "She was in too much of a hurry." },
      { en: "toast", es: "pan tostado", example: "She put bread in the toaster." },
      { en: "roommate", es: "compañero/a de cuarto", example: "Her roommate, Diego, walked into the kitchen." },
      { en: "keys", es: "llaves", example: "Where are my keys?" },
      { en: "pillow", es: "almohada", example: "She found her keys under a pillow." },
      { en: "bus stop", es: "parada de autobús", example: "She walked to the bus stop." },
      { en: "reflection", es: "reflejo", example: "She looked at her reflection in the window." },
      { en: "coworker", es: "compañero/a de trabajo", example: "Her coworker Lucia noticed she looked tired." },
      { en: "rough", es: "difícil / duro", example: "Rough morning?" }
    ],
    grammarFocus: [
      {
        title: "Past Simple negativo",
        explanation: "didn't + verbo base para negar una acción en el pasado.",
        pattern: "Subject + didn't + verb base",
        examples: ["Her alarm didn't ring.", "She didn't have time to eat there."]
      },
      {
        title: "Past Continuous con \"while\"",
        explanation: "was/were + verbo-ing para una acción en progreso, frecuentemente con \"while\".",
        pattern: "..., while + subject + was/were + verb-ing",
        examples: ["While she waited, she looked for her keys.", "She was looking for her keys when Diego walked in."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What went wrong at the beginning of Ana's morning?", options: ["Her alarm didn't ring", "She lost her phone", "Her roommate was sick", "She missed the bus"], answer: 0 },
        { type: "mcq", text: "Where did Ana finally find her keys?", options: ["In the kitchen", "Under a pillow on the sofa", "In her bag", "In the bathroom"], answer: 1 },
        { type: "mcq", text: "True or False: Ana missed the bus.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Ana at the end of the story?", options: ["She will never wake up early again", "She plans to set two alarms to avoid this problem again", "She quit her job", "She was very angry all day"], answer: 1 },
        { type: "order", text: "Ana woke up late / Ana looked for her keys / Ana caught the bus just in time / Ana told Lucia about her morning", answer: "ana woke up late ana looked for her keys ana caught the bus just in time ana told lucia about her morning" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "She found her keys under a ___ on the sofa.", answer: "pillow" },
        { type: "mcq", text: "What does \"in a hurry\" mean?", options: ["Relaxed and calm", "Needing to do something quickly", "Very tired", "Very happy"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"No encontraba sus llaves.\"", answer: "She couldn't find her keys." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the negative past simple?", options: ["Her alarm didn't ring.", "Her alarm not rang.", "Her alarm doesn't rang."], answer: 0 },
        { type: "fill-blank", text: "___ she waited for the toast, she looked for her keys.", answer: "While" },
        { type: "mcq", text: "Which sentence uses Past Continuous correctly?", options: ["She was looking for her keys when Diego walked in.", "She looking for her keys when Diego walked in.", "She looked for her keys when Diego was walk in."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I'm late! I'm late!" },
        { type: "pronunciation", text: "Rough morning?" }
      ],
      expressions: [
        { type: "mcq", text: "What does \"perfect timing\" mean?", options: ["Arriving too late", "Arriving at exactly the right moment", "Being very slow", "Forgetting something"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Ana decided to do differently tomorrow.", answer: "She decided to set two alarms instead of one so she wouldn't oversleep again." }
      ]
    }
  },

  {
    id: "story-proyectos-a2",
    area: "proyectos",
    level: "A2",
    projectId: "core-project",
    title: "My First Week at Work",
    subtitle: "Julia comienza su primer trabajo como QA tester y aprende paso a paso",
    text: `Julia started her first job as a QA tester on Monday morning. She was nervous but also very excited. She had studied for months to get this job, and now she was finally here.

On her first day, her manager, Mr. Reyes, showed her around the office. He introduced her to the team: three developers, one project manager, and another QA tester named Kevin.

"Don't worry if you don't understand everything right away," Kevin told her. "The first week is always confusing."

Julia smiled, but inside she felt worried. There were so many new tools to learn: a system for tracking tickets, a program for writing test cases, and a chat application for talking with the team.

On Tuesday, Julia learned how to write a simple test case. Kevin helped her understand the format. "You write the steps," he explained, "and then you write what should happen. If the real result is different, that's a bug."

"That makes sense," Julia said. "It's like a recipe."

"Exactly," Kevin laughed. "A recipe for finding problems."

By Wednesday, Julia found her first bug. She was testing a form on the website, and when she typed a very long name, the page showed an error message. She felt proud and immediately told Kevin.

"Good job!" he said. "Now you need to report it. Open a new ticket and write what you did, what you expected, and what actually happened."

Julia wrote the ticket carefully. She included a screenshot and a clear description. Mr. Reyes reviewed it later and told her it was a very clear report for a first bug.

That afternoon, one of the developers, Marta, asked Julia a few questions about the bug. She wanted to understand exactly which browser Julia had used and what version of the app was running. Julia checked her notes and answered every question clearly.

"This is really helpful," Marta said. "It's going to save me a lot of time finding the problem."

Julia felt even more confident after that conversation. She realized that a good bug report didn't just help her; it helped the whole team work faster.

On Thursday, before the team meeting, Kevin showed her how to filter tickets by priority, so she could see which bugs needed attention first. Then Julia joined her first team meeting. Everyone talked about their tasks for the week. She was quiet most of the time because she didn't have much to say yet, but she listened carefully and took notes.

By Friday, Julia already felt more comfortable. She knew how to use the ticket system, she understood the basic testing process, and she wasn't afraid to ask questions anymore. She still had a lot to learn, but she felt like part of the team.

At the end of the day, Kevin asked her, "So, how was your first week?"

"It was hard," Julia admitted, "but I liked it a lot. I learned so many new things."

"That's how it always is," Kevin said. "Next week will be easier. And in a few months, you'll be helping the new person, just like I helped you."

Julia smiled. She was looking forward to learning more and becoming a better tester every week.`,
    summaryEs: "Julia comienza su primer trabajo como QA tester. Con la ayuda de su compañero Kevin, aprende a escribir casos de prueba, reporta su primer error y termina la semana sintiéndose parte del equipo.",
    vocab: [
      { en: "tester", es: "probador/a (de pruebas)", example: "Julia started her first job as a QA tester." },
      { en: "nervous", es: "nervioso/a", example: "She was nervous but also very excited." },
      { en: "bug", es: "error", example: "That's a bug." },
      { en: "ticket", es: "ticket / incidencia", example: "Open a new ticket." },
      { en: "screenshot", es: "captura de pantalla", example: "She included a screenshot." },
      { en: "report", es: "reportar / informe", example: "Now you need to report it." },
      { en: "proud", es: "orgulloso/a", example: "She felt proud." },
      { en: "team", es: "equipo", example: "She felt like part of the team." },
      { en: "meeting", es: "reunión", example: "She joined her first team meeting." },
      { en: "comfortable", es: "cómodo/a (a gusto)", example: "Julia already felt more comfortable." }
    ],
    grammarFocus: [
      {
        title: "Present Simple para explicar procesos",
        explanation: "El presente simple describe cómo funciona algo o un proceso general, no solo hábitos.",
        pattern: "Subject + verb (+s)",
        examples: ["You write the steps.", "If the real result is different, that's a bug."]
      },
      {
        title: "Past Simple para contar la primera semana",
        explanation: "Se usa para narrar los eventos de una semana ya terminada, en orden.",
        pattern: "Subject + verb-ed / irregular past",
        examples: ["Julia started her first job on Monday.", "She found her first bug on Wednesday.", "She joined her first team meeting on Thursday."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What was Julia's new job?", options: ["Project manager", "QA tester", "Developer", "Team lead"], answer: 1 },
        { type: "mcq", text: "What did Julia find on Wednesday?", options: ["A new coworker", "Her first bug", "A new ticket system", "A mistake in her report"], answer: 1 },
        { type: "mcq", text: "True or False: Julia talked a lot during her first team meeting.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Kevin?", options: ["He was unfriendly and didn't help Julia", "He was helpful and explained things patiently", "He was Julia's manager", "He didn't like his job"], answer: 1 },
        { type: "order", text: "Julia met the team / Julia wrote her first test case / Julia found her first bug / Julia joined her first team meeting", answer: "julia met the team julia wrote her first test case julia found her first bug julia joined her first team meeting" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "If the real result is different, that's a ___.", answer: "bug" },
        { type: "mcq", text: "What does \"proud\" mean?", options: ["Feeling satisfied about something you did well", "Feeling very tired", "Feeling confused", "Feeling angry"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Ella escribió el ticket con cuidado.\"", answer: "She wrote the ticket carefully." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses Present Simple to explain a process?", options: ["You write the steps, and then you write what should happen.", "You are writing the steps.", "You wrote the steps yesterday."], answer: 0 },
        { type: "fill-blank", text: "Julia ___ (find) her first bug on Wednesday.", answer: "found" },
        { type: "mcq", text: "Which sentence correctly narrates a past sequence?", options: ["She started on Monday, and she found her first bug on Wednesday.", "She starts on Monday, and she finds her first bug on Wednesday.", "She has started on Monday."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Good job! Now you need to report it." },
        { type: "pronunciation", text: "It was hard, but I liked it a lot." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"part of the team\" mean?", options: ["Working alone", "Feeling included and accepted by the group", "Being the newest employee", "Being in charge of the team"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Kevin meant by \"a recipe for finding problems\".", answer: "He meant that a test case is like a recipe with steps to follow, and it helps find problems (bugs) when the result is different from what's expected." }
      ]
    }
  },

  // -------------------------------------------------------------- A1 wave --

  {
    id: "story-cine-a1",
    area: "cine",
    level: "A1",
    title: "Movie Night",
    subtitle: "Una familia disfruta de su noche de película semanal",
    text: `It is Friday night. Anna is happy because it is movie night. Every Friday, Anna and her family watch a movie together at home.

"What movie do you want to watch?" Anna's dad asks.

"I want a funny movie," Anna says. "Funny movies are the best."

Anna's mom makes popcorn in the kitchen. The popcorn smells very good. Anna's little brother, Leo, helps her put the popcorn in a big bowl.

"Can I choose the movie next week?" Leo asks.

"Yes, you can," Anna says. "This week is my turn."

The family sits on the big sofa in the living room. Anna sits in the middle. Leo sits next to her, and their parents sit on the other side. The dog, Max, sleeps at their feet.

Anna's dad turns on the TV. He looks for a funny movie. There are many movies to choose from. Anna sees a movie about a talking dog.

"That one!" Anna says. "It looks funny."

Everyone agrees. Anna's dad plays the movie.

The movie is about a dog who can talk. The dog helps a family solve problems. Anna laughs a lot during the movie. Leo laughs too, even though he doesn't understand every joke.

"This dog is like Max!" Leo says. "But Max can't talk."

"Max is smart, but he can't talk," Anna's mom says, and everyone laughs.

During the movie, they eat popcorn and drink juice. Max wakes up and wants some popcorn too. Anna gives him a small piece.

"Just one piece, Max," she says. "Popcorn isn't good for dogs."

The movie is one hour and thirty minutes long. At the end, everyone claps. It is a happy ending. The talking dog helps the family, and they are all friends.

"That was a great movie," Anna's dad says.

"I loved it," Leo says. "Can we watch it again tomorrow?"

"Maybe next week," Anna's mom says, smiling.

After the movie, it is time for bed. Anna brushes her teeth and puts on her pajamas. She thinks about the funny dog in the movie.

"Goodnight, Mom. Goodnight, Dad," she says.

"Goodnight, Anna," they say. "Sleep well."

Anna goes to bed. She is happy. She loves Friday movie nights with her family. Next Friday, it will be Leo's turn to choose the movie, and Anna can't wait to see what he picks.`,
    summaryEs: "Cada viernes, Anna y su familia tienen noche de película. Esta semana ven una comedia sobre un perro que habla, comen palomitas, y disfrutan de un tiempo feliz juntos.",
    vocab: [
      { en: "movie", es: "película", example: "What movie do you want to watch?" },
      { en: "popcorn", es: "palomitas", example: "Anna's mom makes popcorn." },
      { en: "funny", es: "divertido/a", example: "I want a funny movie." },
      { en: "sofa", es: "sofá", example: "The family sits on the big sofa." },
      { en: "laugh", es: "reír", example: "Anna laughs a lot." },
      { en: "dog", es: "perro", example: "The dog, Max, sleeps at their feet." },
      { en: "happy", es: "feliz", example: "It is a happy ending." },
      { en: "turn", es: "turno", example: "This week is my turn." },
      { en: "together", es: "juntos", example: "They watch a movie together." },
      { en: "pajamas", es: "pijama", example: "She puts on her pajamas." }
    ],
    grammarFocus: [
      {
        title: "Present Simple para rutinas",
        explanation: "Se usa para hablar de cosas que se repiten, como una rutina familiar.",
        pattern: "Subject + verb (+s)",
        examples: ["Anna and her family watch a movie together.", "Anna's mom makes popcorn.", "Max sleeps at their feet."]
      },
      {
        title: "Preguntas simples con \"What\" y \"Can\"",
        explanation: "Preguntas básicas para pedir información o permiso.",
        pattern: "What/Can + subject + verb...?",
        examples: ["What movie do you want to watch?", "Can I choose the movie next week?"]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What day is movie night for Anna's family?", options: ["Monday", "Friday", "Sunday", "Saturday"], answer: 1 },
        { type: "mcq", text: "What kind of movie does Anna want to watch?", options: ["A sad movie", "A funny movie", "A scary movie", "A long movie"], answer: 1 },
        { type: "mcq", text: "True or False: Max the dog can talk in real life.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "Why does everyone laugh when Leo compares Max to the movie dog?", options: ["Because Max is in the movie", "Because Max can't talk like the movie dog", "Because Leo tells a joke", "Because the movie is boring"], answer: 1 },
        { type: "order", text: "The family sits on the sofa / Anna's mom makes popcorn / They watch the movie / Anna goes to bed", answer: "anna's mom makes popcorn the family sits on the sofa they watch the movie anna goes to bed" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Anna's mom makes ___ in the kitchen.", answer: "popcorn" },
        { type: "mcq", text: "What does \"funny\" mean?", options: ["Sad", "Something that makes you laugh", "Very long", "Very quiet"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"La familia mira una película juntos.\"", answer: "The family watches a movie together." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence uses Present Simple correctly?", options: ["Anna's mom makes popcorn.", "Anna's mom making popcorn.", "Anna's mom made popcorn every Friday."], answer: 0 },
        { type: "fill-blank", text: "What movie do you ___ (want) to watch?", answer: "want" },
        { type: "mcq", text: "Which is a correct question with \"Can\"?", options: ["Can I choose the movie next week?", "Can I choosing the movie next week?", "I can choose the movie next week?"], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "What movie do you want to watch?" },
        { type: "pronunciation", text: "That was a great movie." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"I can't wait\" mean?", options: ["I don't want to do it", "I am very excited about something", "I am tired", "I forgot about it"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Anna loves Friday movie nights.", answer: "Because she enjoys spending time together with her family, watching movies and eating popcorn." }
      ]
    }
  },

  {
    id: "story-tecnologia-a1",
    area: "tecnologia",
    level: "A1",
    title: "Learning to Use a Tablet",
    subtitle: "Una abuela aprende a usar su primera tableta con la ayuda de su nieta",
    text: `Grandma Rosa has a new tablet. Her granddaughter, Sofia, wants to teach her how to use it. Rosa is seventy years old, and she doesn't know much about technology.

"This is a tablet, Grandma," Sofia says. "It's like a big phone."

"It's very big," Rosa says. "How do I turn it on?"

Sofia shows her the button on the side. Rosa presses it, and the screen turns on. There are many small pictures on the screen. Sofia calls them "apps."

"Each picture is an app," Sofia explains. "You touch it to open it."

Rosa touches a picture of a camera. A camera app opens. Rosa is surprised.

"Wow!" she says. "It's easy!"

Sofia shows her grandmother how to take a photo. Rosa takes a photo of her cat, Whiskers. She looks at the photo on the screen.

"This is wonderful," Rosa says. "I want to take more photos."

Next, Sofia shows her how to make a video call. Rosa wants to call her son, who lives in another city. Sofia helps her find his name and press the video call button.

The phone rings, and Rosa's son answers. Rosa sees his face on the screen.

"Hello, Mom!" he says. "Is that you on video?"

"Yes! Sofia is teaching me," Rosa says, very happy. "Can you see me?"

"I can see you perfectly," he says, laughing.

Rosa talks to her son for a long time. She shows him her cat on the video call. Her son is happy to see his mother learning new things.

After the call, Rosa wants to learn one more thing. "Can I send messages too?" she asks.

"Yes, of course," Sofia says. "Let me show you."

Sofia teaches her how to open a messaging app and type a message. Rosa types slowly, using one finger.

"Hello, my dear friend," she types, and sends it to her friend Carmen.

A few minutes later, the tablet makes a sound. It's a message from Carmen.

"Wow, you have a tablet now? That's great!" Carmen writes.

Rosa smiles. She feels proud of herself. Learning new technology isn't so difficult after all, especially with Sofia's help.

"Thank you for teaching me," Rosa says to Sofia.

"You're welcome, Grandma," Sofia says. "Next time, I can show you how to watch videos too."

Rosa can't wait for the next lesson.`,
    summaryEs: "Sofia enseña a su abuela Rosa a usar una tableta nueva: tomar fotos, hacer videollamadas y enviar mensajes. Rosa se siente orgullosa de aprender algo nuevo.",
    vocab: [
      { en: "tablet", es: "tableta", example: "Grandma Rosa has a new tablet." },
      { en: "screen", es: "pantalla", example: "The screen turns on." },
      { en: "app", es: "aplicación", example: "Each picture is an app." },
      { en: "touch", es: "tocar", example: "You touch it to open it." },
      { en: "camera", es: "cámara", example: "Rosa touches a picture of a camera." },
      { en: "video call", es: "videollamada", example: "Sofia shows her how to make a video call." },
      { en: "message", es: "mensaje", example: "Can I send messages too?" },
      { en: "send", es: "enviar", example: "She sends it to her friend Carmen." },
      { en: "button", es: "botón", example: "Sofia shows her the button on the side." },
      { en: "teach", es: "enseñar", example: "Thank you for teaching me." }
    ],
    grammarFocus: [
      {
        title: "\"Can I...?\" para pedir permiso",
        explanation: "Se usa para pedir permiso de forma sencilla y educada.",
        pattern: "Can I + verb...?",
        examples: ["Can I send messages too?", "Can you see me?"]
      },
      {
        title: "Present Simple e imperativos para instrucciones",
        explanation: "Se usan para explicar cómo funciona algo, paso a paso.",
        pattern: "Subject + verb; Verb (imperative)",
        examples: ["You touch it to open it.", "Press the button."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why does Sofia want to teach Rosa?", options: ["Rosa has a new tablet and doesn't know how to use it", "Rosa broke her old tablet", "Sofia needs Rosa's help", "Rosa is Sofia's teacher"], answer: 0 },
        { type: "mcq", text: "What is the first app Rosa opens?", options: ["Messages", "Video call", "Camera", "Games"], answer: 2 },
        { type: "mcq", text: "True or False: Rosa's son lives in the same house.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Rosa at the end of the story?", options: ["She doesn't want to learn more", "She feels proud and wants to learn more", "She is angry with Sofia", "She doesn't like the tablet"], answer: 1 },
        { type: "order", text: "Rosa turns on the tablet / Rosa takes a photo of her cat / Rosa makes a video call to her son / Rosa sends a message to Carmen", answer: "rosa turns on the tablet rosa takes a photo of her cat rosa makes a video call to her son rosa sends a message to carmen" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Each picture is an ___. You touch it to open it.", answer: "app" },
        { type: "mcq", text: "What does \"touch\" mean here?", options: ["To hit hard", "To press lightly with your finger", "To look at", "To clean"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Ella le enseña a usar la tableta.\"", answer: "She teaches her how to use the tablet." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly asks for permission?", options: ["Can I send messages too?", "I can send messages too?", "Can I sending messages too?"], answer: 0 },
        { type: "fill-blank", text: "You ___ (touch) it to open it.", answer: "touch" },
        { type: "mcq", text: "Which is a correct instruction?", options: ["Press the button.", "Pressing the button.", "You pressed the button."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Thank you for teaching me." },
        { type: "pronunciation", text: "Is that you on video?" }
      ],
      expressions: [
        { type: "mcq", text: "What does \"I can't wait\" mean?", options: ["I am not interested", "I am excited for something in the future", "I am angry", "I am confused"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words how Sofia helped her grandmother.", answer: "Sofia showed her how to use the apps, take photos, make video calls, and send messages on her new tablet." }
      ]
    }
  },

  {
    id: "story-viajes-a1",
    area: "viajes",
    level: "A1",
    title: "A Weekend Trip",
    subtitle: "Dos amigos viajan a un pueblo cerca de las montañas por el fin de semana",
    text: `Pedro and his friend Luis are going on a short trip. They want to visit a small town near the mountains. The trip is only for the weekend, from Saturday to Sunday.

On Friday night, Pedro packs his bag. He puts in two shirts, one pair of pants, and his toothbrush. He also packs his camera because he wants to take photos of the mountains.

On Saturday morning, Luis picks up Pedro in his car. "Are you ready?" Luis asks.

"Yes, I'm ready!" Pedro says, and he gets in the car.

The drive to the mountains takes two hours. They listen to music and talk about their plans. Pedro is excited to see the mountains because he has never been there before.

"Is it beautiful there?" Pedro asks.

"Yes, it's very beautiful," Luis says. "There are green hills and a small river."

When they arrive, they check into a small hotel. The hotel room is simple but clean. There are two beds and a small window with a view of the mountains.

"Look at this view!" Pedro says, looking out the window. "It's amazing."

In the afternoon, they walk around the town. The town is small, with a few shops and a market. They buy some fruit at the market and eat it while they walk.

"This town is very quiet," Pedro says. "I like it."

"Me too," Luis says. "It's very different from the city."

In the evening, they eat dinner at a small restaurant. The food is delicious. They eat soup and bread, and they talk about their friends and family.

The next morning, on Sunday, they wake up early. They want to walk in the mountains before they go home. They walk for two hours, and Pedro takes many photos with his camera.

"This is my favorite photo," Pedro says, showing Luis a picture of the green hills.

"It's a great photo," Luis says. "You should print it."

After their walk, they eat breakfast and drive back to the city. The drive home feels short because they are both tired and happy.

"Thank you for this trip," Pedro says. "I loved it."

"We should come back next year," Luis says.

"Yes, definitely," Pedro agrees.

They arrive home in the evening, tired but happy. Pedro looks at his photos again and smiles. It was a perfect weekend trip.`,
    summaryEs: "Pedro y Luis pasan un fin de semana en un pueblo de montaña. Caminan, toman fotos, comen en un restaurante pequeño y disfrutan de un viaje tranquilo y feliz.",
    vocab: [
      { en: "trip", es: "viaje", example: "They are going on a short trip." },
      { en: "pack", es: "empacar", example: "Pedro packs his bag." },
      { en: "camera", es: "cámara", example: "He packs his camera." },
      { en: "hotel", es: "hotel", example: "They check into a small hotel." },
      { en: "view", es: "vista", example: "Look at this view!" },
      { en: "market", es: "mercado", example: "They buy some fruit at the market." },
      { en: "quiet", es: "tranquilo/a", example: "This town is very quiet." },
      { en: "delicious", es: "delicioso/a", example: "The food is delicious." },
      { en: "mountain", es: "montaña", example: "They want to visit a small town near the mountains." },
      { en: "photo", es: "foto", example: "Pedro takes many photos." }
    ],
    grammarFocus: [
      {
        title: "Present Continuous para planes cercanos",
        explanation: "is/are + verbo-ing también se usa para hablar de planes ya organizados en un futuro cercano.",
        pattern: "Subject + is/are + verb-ing",
        examples: ["Pedro and Luis are going on a short trip.", "They are visiting a small town."]
      },
      {
        title: "Present Perfect para experiencias (never been)",
        explanation: "have/has + participio para hablar de experiencias de vida, sin decir cuándo exactamente.",
        pattern: "Subject + have/has (never) + past participle",
        examples: ["Pedro has never been there before.", "Have you ever visited the mountains?"]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "How long is the trip?", options: ["One week", "One day", "The weekend", "One month"], answer: 2 },
        { type: "mcq", text: "What does Pedro pack for the trip?", options: ["A camera, shirts, and pants", "A laptop and books", "Only his toothbrush", "A tent"], answer: 0 },
        { type: "mcq", text: "True or False: Pedro has visited the mountains many times before.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about the town?", options: ["It is very big and noisy", "It is small and quiet", "It has no shops", "It is near the beach"], answer: 1 },
        { type: "order", text: "Pedro packs his bag / Luis picks up Pedro / They walk around the town / They walk in the mountains", answer: "pedro packs his bag luis picks up pedro they walk around the town they walk in the mountains" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Pedro packs his ___ because he wants to take photos.", answer: "camera" },
        { type: "mcq", text: "What does \"delicious\" mean?", options: ["Very tasty", "Very expensive", "Very cold", "Very small"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"El pueblo es muy tranquilo.\"", answer: "The town is very quiet." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence uses Present Continuous for a plan correctly?", options: ["Pedro and Luis are going on a short trip.", "Pedro and Luis go on a short trip now.", "Pedro and Luis went on a short trip tomorrow."], answer: 0 },
        { type: "fill-blank", text: "Pedro ___ (never / be) to the mountains before.", answer: "has never been" },
        { type: "mcq", text: "Which question correctly asks about experience?", options: ["Have you ever visited the mountains?", "Have you ever visiting the mountains?", "Did you have visited the mountains?"], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Look at this view! It's amazing." },
        { type: "pronunciation", text: "We should come back next year." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"check into\" mean?", options: ["To leave a hotel", "To register and get a room at a hotel", "To check a phone", "To pay a bill"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Pedro enjoyed the trip.", answer: "Because he saw beautiful mountains for the first time, took nice photos, and spent good time with his friend Luis in a quiet town." }
      ]
    }
  },

  {
    id: "story-vidacotidiana-a1",
    area: "vidacotidiana",
    level: "A1",
    title: "Helping at Home",
    subtitle: "Un niño ayuda con las tareas del hogar cada sábado",
    text: `Every Saturday, Mateo helps his family with housework. He is ten years old, and he likes to help. Today, his mother makes a list of chores for the family.

"Mateo, can you clean your room?" his mother asks.

"Yes, Mom," Mateo says. He goes to his room and starts to clean.

First, he makes his bed. He puts his pillow in the right place and pulls the blanket up. Next, he picks up his toys from the floor and puts them in a big box. His room looks much better now.

After his room, Mateo helps in the kitchen. His father is washing the dishes.

"Can I help you, Dad?" Mateo asks.

"Yes, you can dry the dishes," his father says.

Mateo takes a clean towel and dries the plates and cups. He is careful because he doesn't want to break anything. His father washes, and Mateo dries. They work together, and it doesn't take long.

Then, Mateo's older sister, Valentina, asks for help too. She is cleaning the living room.

"Can you help me with the books?" Valentina asks. "They are everywhere."

Mateo helps her put the books back on the shelf. Some books are big, and some are small. Mateo puts the small books on the top shelf and the big books on the bottom shelf.

"Thank you, Mateo," Valentina says. "You're a good helper."

"I like helping," Mateo says, smiling.

After all the chores, the family sits in the clean living room. The house looks very nice now: the floors are clean, the dishes are put away, and the books are organized.

"Good job, everyone," Mateo's mother says. "The house looks wonderful."

"Can we watch a movie now?" Mateo asks. "We finished all the chores."

"Yes, we can," his mother says. "You all worked hard today."

The family sits together and chooses a movie. Mateo feels happy and proud. He likes helping his family, and he likes it even more when they spend time together afterward.

"I like Saturdays," Mateo says. "We work together, and then we have fun together."

"Me too," Valentina says, putting her arm around him.

The family watches the movie together, tired but happy after a productive morning of housework.`,
    summaryEs: "Cada sábado, Mateo ayuda a su familia con las tareas del hogar: limpia su cuarto, seca los platos y organiza los libros. Al final, la familia disfruta de una película juntos.",
    vocab: [
      { en: "chore", es: "tarea (del hogar)", example: "His mother makes a list of chores." },
      { en: "clean", es: "limpiar", example: "Can you clean your room?" },
      { en: "bed", es: "cama", example: "He makes his bed." },
      { en: "pillow", es: "almohada", example: "He puts his pillow in the right place." },
      { en: "towel", es: "toalla", example: "Mateo takes a clean towel." },
      { en: "dish", es: "plato", example: "He dries the plates and cups." },
      { en: "shelf", es: "estante", example: "He puts the books back on the shelf." },
      { en: "helper", es: "ayudante", example: "You're a good helper." },
      { en: "organize", es: "organizar", example: "The books are organized." },
      { en: "proud", es: "orgulloso/a", example: "Mateo feels happy and proud." }
    ],
    grammarFocus: [
      {
        title: "\"Can\" para pedir/ofrecer ayuda",
        explanation: "Se usa para pedir u ofrecer ayuda de forma sencilla.",
        pattern: "Can + subject + verb...?",
        examples: ["Can you clean your room?", "Can I help you, Dad?"]
      },
      {
        title: "Present Simple para tareas y rutinas del hogar",
        explanation: "Se usa para describir tareas que se repiten regularmente.",
        pattern: "Subject + verb (+s)",
        examples: ["Every Saturday, Mateo helps his family.", "His father washes, and Mateo dries."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What day does Mateo help with housework?", options: ["Sunday", "Saturday", "Every day", "Friday"], answer: 1 },
        { type: "mcq", text: "What is the first chore Mateo does?", options: ["Washing dishes", "Cleaning his room", "Organizing books", "Cooking"], answer: 1 },
        { type: "mcq", text: "True or False: Mateo doesn't like helping his family.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Mateo?", options: ["He is lazy and doesn't like chores", "He enjoys helping his family and feels proud", "He only helps when his mother forces him", "He prefers to be alone"], answer: 1 },
        { type: "order", text: "Mateo cleans his room / Mateo dries the dishes / Mateo organizes the books / The family watches a movie", answer: "mateo cleans his room mateo dries the dishes mateo organizes the books the family watches a movie" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Mateo takes a clean ___ and dries the plates.", answer: "towel" },
        { type: "mcq", text: "What does \"chore\" mean?", options: ["A fun game", "A small job or task you do at home", "A type of food", "A type of movie"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Él ayuda a su familia.\"", answer: "He helps his family." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly offers help?", options: ["Can I help you, Dad?", "I can helping you, Dad?", "Can I helping you, Dad?"], answer: 0 },
        { type: "fill-blank", text: "His father ___ (wash) the dishes, and Mateo dries them.", answer: "washes" },
        { type: "mcq", text: "Which sentence uses Present Simple correctly for a routine?", options: ["Every Saturday, Mateo helps his family.", "Every Saturday, Mateo helping his family.", "Every Saturday, Mateo helped his family."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Can I help you, Dad?" },
        { type: "pronunciation", text: "You're a good helper." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"good job\" mean?", options: ["A type of employment", "Well done, you did something well", "A difficult task", "A mistake"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Mateo likes Saturdays.", answer: "Because his family works together to clean the house, and then they relax and watch a movie together afterward." }
      ]
    }
  },

  {
    id: "story-proyectos-a1",
    area: "proyectos",
    level: "A1",
    projectId: "core-project",
    title: "Learning the Ticket System",
    subtitle: "Un nuevo empleado de soporte aprende a usar el sistema de tickets",
    text: `Diego started a new job last week. He works as a support agent for a technology company. Today, his coworker Elena is teaching him how to use the ticket system.

"A ticket is a report about a problem," Elena explains. "Customers send us tickets when something doesn't work."

"How do I open a ticket?" Diego asks.

"It's easy," Elena says. "Look, I'll show you."

Elena opens her computer and shows Diego the system. There is a list of tickets on the screen. Each ticket has a number, a title, and a status.

"What does 'status' mean?" Diego asks.

"It tells us what is happening with the ticket," Elena explains. "New means nobody is working on it yet. In progress means someone is working on it. Done means the problem is fixed."

Diego looks at the list. He sees five tickets with the status "New."

"Can I try one?" he asks.

"Yes, choose one," Elena says.

Diego clicks on a ticket. It says: "The app doesn't open on my phone."

"What do I do now?" Diego asks.

"First, read the ticket carefully," Elena says. "Then, try to understand the problem. You can also ask the customer for more details if you need them."

Diego reads the ticket again. He writes a message to the customer: "Hello, can you tell me what phone you have?"

A few minutes later, the customer answers. Diego reads the answer and thinks about the problem.

"I think I know the problem," Diego says. "The customer needs to update the app."

"Good thinking!" Elena says. "Write that in your reply."

Diego writes a message to the customer, explaining how to update the app. He changes the ticket status to "In progress."

Later that day, the customer writes back: "Thank you! The app works now."

Diego is very happy. He changes the ticket status to "Done."

"My first ticket!" Diego says, smiling.

"Great job," Elena says. "You did it well."

Diego feels proud. It is his first day using the ticket system, but he already helped a customer. He knows there is much more to learn, but today feels like a good start.`,
    summaryEs: "Diego comienza su primer día como agente de soporte y aprende, con la ayuda de Elena, a usar el sistema de tickets. Resuelve su primer caso, sintiéndose orgulloso de su progreso.",
    vocab: [
      { en: "ticket", es: "ticket / incidencia", example: "A ticket is a report about a problem." },
      { en: "customer", es: "cliente", example: "Customers send us tickets." },
      { en: "status", es: "estado", example: "Each ticket has a status." },
      { en: "problem", es: "problema", example: "The app doesn't open." },
      { en: "update", es: "actualizar", example: "The customer needs to update the app." },
      { en: "reply", es: "respuesta / responder", example: "Write that in your reply." },
      { en: "coworker", es: "compañero/a de trabajo", example: "His coworker Elena is teaching him." },
      { en: "screen", es: "pantalla", example: "There is a list of tickets on the screen." },
      { en: "list", es: "lista", example: "Diego looks at the list." },
      { en: "fix", es: "arreglar / corregir", example: "Done means the problem is fixed." }
    ],
    grammarFocus: [
      {
        title: "Present Simple para explicar un sistema",
        explanation: "Se usa para explicar cómo funciona algo de forma general.",
        pattern: "Subject + verb (+s)",
        examples: ["A ticket is a report about a problem.", "It tells us what is happening with the ticket."]
      },
      {
        title: "Imperativos para dar instrucciones",
        explanation: "Se usan para explicar pasos a seguir.",
        pattern: "Verb (base form)",
        examples: ["First, read the ticket carefully.", "Write that in your reply."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What is Diego's new job?", options: ["Developer", "Support agent", "Manager", "Designer"], answer: 1 },
        { type: "mcq", text: "What does the status 'New' mean?", options: ["The problem is fixed", "Someone is working on it", "Nobody is working on it yet", "The ticket was deleted"], answer: 2 },
        { type: "mcq", text: "True or False: Diego's first ticket was about a password problem.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Elena?", options: ["She is impatient and doesn't want to help", "She is a patient teacher who explains things clearly", "She doesn't know how the system works", "She is Diego's manager"], answer: 1 },
        { type: "order", text: "Diego opens a ticket / Diego asks the customer a question / Diego explains how to update the app / Diego changes the status to Done", answer: "diego opens a ticket diego asks the customer a question diego explains how to update the app diego changes the status to done" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "A ___ is a report about a problem.", answer: "ticket" },
        { type: "mcq", text: "What does \"status\" mean in this story?", options: ["The price of something", "What is happening with the ticket right now", "The customer's name", "The date of the ticket"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"El cliente escribió una respuesta.\"", answer: "The customer wrote a reply." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly explains how something works?", options: ["A ticket is a report about a problem.", "A ticket was a report about a problem.", "A ticket being a report about a problem."], answer: 0 },
        { type: "fill-blank", text: "First, ___ (read) the ticket carefully.", answer: "read" },
        { type: "mcq", text: "Which is a correct instruction?", options: ["Write that in your reply.", "You writing that in your reply.", "Wrote that in your reply."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Can I try one?" },
        { type: "pronunciation", text: "Great job! You did it well." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"good thinking\" mean?", options: ["A bad idea", "A compliment for a smart idea", "A question", "A type of ticket"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words how Diego solved his first ticket.", answer: "He read the ticket, asked the customer for more details, understood the problem was about updating the app, and explained how to fix it." }
      ]
    }
  },

  // -------------------------------------------------------------- B2 wave --

  {
    id: "story-cine-b2",
    area: "cine",
    level: "B2",
    title: "The Director's Cut",
    subtitle: "Una cineasta debe negociar con un estudio para proteger la visión de su documental",
    text: `Elena had spent four years making her first documentary. It told the story of a small fishing village that was slowly disappearing as young people moved to the cities. She had filmed for months, interviewing fishermen, capturing the quiet rhythm of daily life, and documenting a way of living that was fading away.

When the film was finally finished, it was submitted to a major distributor. The response was positive, but there was a catch: the distributor wanted changes. They felt the film was too slow and suggested that twenty minutes be cut, including several long, quiet scenes that Elena considered essential to the film's emotional impact.

"These scenes are what make the film honest," Elena argued during a meeting with the producers. "If we remove them, we lose the atmosphere we worked so hard to create."

The lead producer, a man named Richard, disagreed. "Audiences today don't have the patience for slow pacing," he said. "The film needs to move faster, or it won't be watched by anyone."

Elena was told that the final decision wasn't entirely hers to make, since the distribution contract gave the studio some editorial control. She left the meeting feeling frustrated and unsure of what to do next.

That evening, she called her old film professor, someone whose opinion she had always trusted. She explained the situation, hoping for advice.

"You have two choices," her professor said. "You can fight for every scene and risk losing the deal entirely, or you can find a compromise that protects what matters most to you."

Elena thought about this for several days. She realized that not every scene was equally important. Some of the quieter moments could be shortened without losing their meaning, even if she didn't want to remove them completely.

She returned to the studio with a counter-proposal. Instead of cutting twenty minutes randomly, she suggested a different edit: several scenes would be trimmed, but the three moments she considered most essential — including the final scene with an elderly fisherman reflecting on his life — would remain untouched.

Richard reviewed her proposal carefully. "This is reasonable," he admitted. "I can work with this."

Over the following weeks, Elena reworked the film alongside an editor the studio had assigned to help her. It wasn't the process she had originally imagined, and there were moments of tension, but she found that having another perspective occasionally improved scenes she had been too close to judge objectively.

When the new cut was finished, Elena watched it with a mixture of anxiety and curiosity. The film was tighter, and to her surprise, she didn't feel that its soul had been lost. The essential scenes were still there, carrying the emotional weight she had fought to protect.

The documentary premiered three months later at a regional film festival. Elena sat in the back of the theater, watching the audience's reactions rather than the screen itself. When the final scene played — the old fisherman, sitting alone by the shore, talking about a life spent on the water — the theater was completely silent.

After the screening, several audience members approached her, visibly moved. One woman, wiping tears from her eyes, told Elena that the film had reminded her of her own grandfather, a fisherman who had passed away years earlier.

"It's strange," Elena said to her professor later that week. "I was so afraid that cutting anything would ruin the film. In the end, some of those changes actually made it stronger."

"That's often how it works," her professor replied. "Compromise isn't always a loss. Sometimes it forces you to understand what truly matters."

The documentary went on to be selected for several international festivals, and eventually, it was picked up for a wider release — the version audiences saw was the compromise Elena had fought for, imperfect but true to what she had set out to create.`,
    summaryEs: "Elena debe negociar con un estudio de distribución que quiere recortar su documental. En lugar de resistirse a todo, propone un compromiso que protege las escenas esenciales, y descubre que algunos cambios fortalecieron la película.",
    vocab: [
      { en: "documentary", es: "documental", example: "Elena had spent four years making her first documentary." },
      { en: "distributor", es: "distribuidora", example: "It was submitted to a major distributor." },
      { en: "compromise", es: "compromiso / término medio", example: "You can find a compromise." },
      { en: "pacing", es: "ritmo narrativo", example: "Audiences today don't have the patience for slow pacing." },
      { en: "atmosphere", es: "atmósfera", example: "We lose the atmosphere we worked so hard to create." },
      { en: "trim", es: "recortar (editar)", example: "Several scenes would be trimmed." },
      { en: "premiere", es: "estreno / estrenar", example: "The documentary premiered three months later." },
      { en: "objectively", es: "objetivamente", example: "Too close to judge objectively." },
      { en: "essential", es: "esencial", example: "The three moments she considered most essential." },
      { en: "frustrated", es: "frustrado/a", example: "She left the meeting feeling frustrated." }
    ],
    grammarFocus: [
      {
        title: "Passive Voice para procesos y decisiones",
        explanation: "La voz pasiva (be + participio) se usa cuando el foco está en la acción o el resultado, no en quién la realiza — común en contextos formales o de negocio.",
        pattern: "Subject + be + past participle (+ by + agent)",
        examples: ["The film was submitted to a major distributor.", "She was told that the final decision wasn't entirely hers.", "The version audiences saw was the compromise Elena had fought for."]
      },
      {
        title: "Reported Speech (estilo indirecto)",
        explanation: "Se usa para contar lo que alguien dijo sin citar sus palabras exactas, generalmente cambiando el tiempo verbal hacia atrás.",
        pattern: "Subject + said/told + that + clause (tiempo retrocedido)",
        examples: ["Richard said the film needed to move faster.", "Her professor said she had two choices.", "She explained the situation, hoping for advice."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What was Elena's documentary about?", options: ["A famous director", "A disappearing fishing village", "A film festival", "A film school"], answer: 1 },
        { type: "mcq", text: "What did the distributor want to change?", options: ["The title of the film", "Twenty minutes of slow scenes", "The music", "The actors"], answer: 1 },
        { type: "mcq", text: "True or False: Elena removed all the quiet scenes the distributor wanted cut.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Elena's relationship with her old professor?", options: ["She doesn't trust his opinion", "She values his advice and seeks his guidance", "They haven't spoken in years", "He disagrees with everything she does"], answer: 1 },
        { type: "order", text: "Elena meets with the producers / Elena calls her professor / Elena proposes a compromise edit / The documentary premieres at a festival", answer: "elena meets with the producers elena calls her professor elena proposes a compromise edit the documentary premieres at a festival" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Elena felt ___ after the meeting because she didn't get what she wanted.", answer: "frustrated" },
        { type: "mcq", text: "What does \"compromise\" mean in this context?", options: ["A complete victory for one side", "An agreement where both sides give up something", "A total refusal to negotiate", "A type of film genre"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"El documental se estrenó en un festival.\"", answer: "The documentary premiered at a festival." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the passive voice?", options: ["The film was submitted to a major distributor.", "The film submitted to a major distributor.", "She was submit the film to a distributor."], answer: 0 },
        { type: "fill-blank", text: "Richard said the film ___ (need) to move faster. (reported speech)", answer: "needed" },
        { type: "mcq", text: "Which sentence correctly reports what the professor said?", options: ["Her professor said she had two choices.", "Her professor said she has two choices, said yesterday.", "Her professor say she had two choices."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "These scenes are what make the film honest." },
        { type: "pronunciation", text: "Compromise isn't always a loss." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"too close to judge objectively\" mean?", options: ["Physically near something", "So personally involved that it's hard to be fair or neutral", "Standing very near the screen", "Unable to see clearly"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Elena's professor meant by \"compromise isn't always a loss\".", answer: "He meant that making changes or accepting a middle ground doesn't always mean losing something important — sometimes it can actually improve the result or help you understand what truly matters." }
      ]
    }
  },

  {
    id: "story-tecnologia-b2",
    area: "tecnologia",
    level: "B2",
    title: "The Beta Tester",
    subtitle: "Una probadora independiente debe convencer a un gerente de producto de corregir un problema antes del lanzamiento",
    text: `Camila had been working as a freelance beta tester for almost three years. She was hired by a startup to test a new budgeting app just weeks before its public launch. The team was confident that the app was ready, but Camila had a feeling that something wasn't quite right.

During her first two days of testing, she noticed that many first-time users struggled to complete the initial setup process. The steps weren't clearly explained, and important buttons were easy to overlook. She decided to run a small, informal test with five people who had never used the app before.

The results were troubling. Four out of five participants got stuck at the same step, unable to figure out how to link their bank account. Camila carefully documented each session, noting exactly where users hesitated and what confused them.

She scheduled a meeting with the product manager, a man named Julian, who had been leading the project for over a year. Camila suspected he wouldn't want to hear that a core part of his app needed to be redesigned so close to launch.

"I found a significant issue with the onboarding flow," Camila explained, sharing her screen. "Four out of five test users couldn't complete account setup without help."

Julian frowned. "We've tested this internally, and our team didn't have any problems," he said, sounding defensive.

"That might be because your team already knows how the app works," Camila pointed out gently. "New users don't have that advantage."

Julian wasn't immediately convinced. He explained that the launch date had already been announced publicly, and that delaying it would be embarrassing for the company. Camila understood his concern, but she also knew that launching a broken onboarding experience could be far more damaging in the long run.

Rather than insisting that the entire flow be redesigned, Camila suggested a smaller, more targeted fix. She proposed that just three screens be simplified, with clearer instructions and a visible progress indicator, so users would always know what step they were on.

"This wouldn't require rebuilding anything," she explained. "It's mostly about clarity, not new functionality."

Julian was still hesitant, but he agreed to test her proposed changes with a new group of users before making a final decision. Camila worked quickly, sketching out simple mockups of the improved screens and sending them to the design team.

Two days later, a new round of testing was conducted with five different participants. This time, all five completed the setup process without any assistance. One user even commented that the process felt "surprisingly smooth."

When Julian saw the results, his attitude changed noticeably. "I have to admit, this made a real difference," he said. "I was worried about the deadline, but I think it would have been a bigger mistake to launch without fixing this."

The changes were implemented within a week, and the launch date was pushed back by only three days — a small delay that Julian later described as "the best decision we made during the entire project."

Camila's report was later shared with the rest of the development team as an example of how user testing, even informal and small-scale, could reveal problems that internal testing often missed.

"You were right to push back," Julian told her during their final call. "I was too close to the project to see it clearly."

Camila smiled. It wasn't the first time she had heard that from a client, and she suspected it wouldn't be the last.`,
    summaryEs: "Camila, probadora independiente, descubre un problema grave de usabilidad antes del lanzamiento de una app. Debe convencer a un gerente de producto reticente, proponiendo una solución específica que finalmente mejora el producto.",
    vocab: [
      { en: "onboarding", es: "proceso de incorporación de usuarios", example: "I found a significant issue with the onboarding flow." },
      { en: "hesitate", es: "dudar / titubear", example: "Camila noted exactly where users hesitated." },
      { en: "defensive", es: "a la defensiva", example: "He said, sounding defensive." },
      { en: "mockup", es: "maqueta / prototipo", example: "Camila sketched out simple mockups." },
      { en: "functionality", es: "funcionalidad", example: "It's mostly about clarity, not new functionality." },
      { en: "deadline", es: "fecha límite", example: "I was worried about the deadline." },
      { en: "implement", es: "implementar", example: "The changes were implemented within a week." },
      { en: "targeted", es: "específico / dirigido", example: "Camila suggested a smaller, more targeted fix." },
      { en: "troubling", es: "preocupante", example: "The results were troubling." },
      { en: "launch", es: "lanzamiento", example: "The launch date was pushed back by three days." }
    ],
    grammarFocus: [
      {
        title: "Passive Voice en contextos de producto/negocio",
        explanation: "Se usa cuando el proceso o resultado importa más que quién lo realiza, común en reportes técnicos.",
        pattern: "Subject + be + past participle",
        examples: ["The changes were implemented within a week.", "A new round of testing was conducted.", "The launch date was pushed back by three days."]
      },
      {
        title: "Phrasal verbs comunes en el trabajo",
        explanation: "Combinaciones de verbo + partícula con significados propios, frecuentes en inglés profesional.",
        pattern: "verb + particle",
        examples: ["Camila pointed out that new users didn't have that advantage.", "Users couldn't figure out how to link their bank account.", "The launch date was pushed back by three days."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What problem did Camila discover during testing?", options: ["The app crashed frequently", "Users struggled to complete the initial setup process", "The app was too expensive", "The design colors were wrong"], answer: 1 },
        { type: "mcq", text: "How many of the five test users got stuck at the same step?", options: ["One", "Two", "Four", "All five"], answer: 2 },
        { type: "mcq", text: "True or False: Julian immediately agreed to redesign the entire onboarding flow.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Julian by the end of the story?", options: ["He never changed his opinion", "He realized Camila's feedback was valuable, even though he initially resisted it", "He fired Camila", "He ignored the new test results"], answer: 1 },
        { type: "order", text: "Camila tests the app with five new users / Camila meets with Julian / The design team creates new mockups / The launch date is pushed back by three days", answer: "camila tests the app with five new users camila meets with julian the design team creates new mockups the launch date is pushed back by three days" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Four out of five participants got stuck during the ___ process.", answer: "onboarding" },
        { type: "mcq", text: "What does \"defensive\" mean in this context?", options: ["Very friendly and open", "Reacting as if being criticized or attacked", "Extremely confident", "Completely calm"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Ella documentó cada sesión cuidadosamente.\"", answer: "She documented each session carefully." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the passive voice?", options: ["The changes were implemented within a week.", "The changes implemented within a week.", "They was implemented the changes."], answer: 0 },
        { type: "fill-blank", text: "Camila ___ (point) out that new users didn't have that advantage.", answer: "pointed" },
        { type: "mcq", text: "Which sentence uses a phrasal verb correctly?", options: ["Users couldn't figure out how to link their bank account.", "Users couldn't figure how out to link their bank account.", "Users couldn't figure their bank account out how."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I found a significant issue with the onboarding flow." },
        { type: "pronunciation", text: "I was too close to the project to see it clearly." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"push back\" mean when talking about a launch date?", options: ["To cancel it completely", "To delay it to a later date", "To announce it publicly", "To make it earlier"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Camila's small-scale test was valuable, according to the story.", answer: "Because it revealed usability problems that the internal team, who already knew the app well, hadn't noticed, showing that outside perspective can catch issues internal testing misses." }
      ]
    }
  },

  {
    id: "story-viajes-b2",
    area: "viajes",
    level: "B2",
    title: "Lost in Translation",
    subtitle: "Un malentendido cultural durante una cena de negocios en Japón enseña una lección de humildad",
    text: `When Robert was asked to travel to Japan for a two-week business assignment, he felt both excited and nervous. He had studied a little Japanese before the trip, but he knew his skills were far from fluent. His company had arranged a local assistant, a young woman named Yuki, who would help him navigate meetings and translate when necessary.

On his third day, Robert was invited to a dinner with several important clients. Yuki had warned him beforehand that business dinners in Japan often followed certain customs that might be unfamiliar to him, but Robert, eager to make a good impression, insisted he could handle most of the conversation himself.

The dinner began smoothly. Robert exchanged business cards politely, using both hands as Yuki had taught him, and complimented the food enthusiastically. However, halfway through the meal, one of the clients, an older man named Mr. Tanaka, said something in Japanese that Robert didn't fully understand. Rather than asking for clarification, Robert smiled and nodded, assuming it was simply a polite comment.

It wasn't until later, when Yuki quietly leaned over, that Robert realized his mistake. Mr. Tanaka had actually been asking whether Robert would be interested in visiting his family's factory the following week — an invitation that, in the local business culture, was considered a significant gesture of trust and respect.

By smiling and nodding without giving a clear answer, Robert had unintentionally suggested that he wasn't particularly interested, which could have been perceived as dismissive.

"I think I made things awkward," Robert whispered to Yuki, feeling his face turn red.

"It's not too late," Yuki reassured him. "Let me help."

Yuki spoke briefly with Mr. Tanaka, explaining diplomatically that Robert had misunderstood the invitation due to a language barrier, and that he would, in fact, be honored to visit the factory. Mr. Tanaka's expression softened immediately, and he laughed warmly, seemingly relieved that the confusion had been a simple misunderstanding rather than a lack of interest.

"Please tell him I apologize for the confusion," Robert said, "and that I would genuinely love to visit."

Yuki translated his words carefully, adding a respectful phrase that Robert didn't recognize but that seemed to please Mr. Tanaka even more.

For the rest of the dinner, Robert made a conscious effort to ask for clarification whenever he wasn't completely sure what was being said, rather than risk another misunderstanding. He found that people appreciated his honesty far more than they would have appreciated a confident but incorrect assumption.

The following week, Robert visited Mr. Tanaka's factory as planned. The visit turned out to be an important step in building a stronger business relationship between the two companies, one that might not have happened if Yuki hadn't caught the misunderstanding in time.

On his flight home at the end of the trip, Robert reflected on what he had learned. It wasn't just about language, he realized, but about humility — about being willing to admit when you don't understand something, instead of pretending that you do.

"Next time," he told Yuki before saying goodbye at the airport, "I'll ask more questions and assume less."

Yuki smiled. "That's probably the most important lesson anyone can learn while traveling," she said. "In any language."`,
    summaryEs: "Durante un viaje de negocios a Japón, Robert malinterpreta una invitación importante por no pedir aclaración. Con la ayuda de su asistente Yuki, resuelve el malentendido y aprende una lección duradera sobre humildad cultural.",
    vocab: [
      { en: "assignment", es: "asignación / encargo", example: "Robert was asked to travel to Japan for a business assignment." },
      { en: "fluent", es: "fluido/a (en un idioma)", example: "He knew his skills were far from fluent." },
      { en: "custom", es: "costumbre", example: "Business dinners often followed certain customs." },
      { en: "gesture", es: "gesto", example: "It was considered a significant gesture of trust." },
      { en: "dismissive", es: "desdeñoso/a", example: "It could have been perceived as dismissive." },
      { en: "barrier", es: "barrera", example: "Robert had misunderstood due to a language barrier." },
      { en: "apologize", es: "disculparse", example: "Please tell him I apologize for the confusion." },
      { en: "diplomatically", es: "diplomáticamente", example: "Yuki explained diplomatically." },
      { en: "humility", es: "humildad", example: "It wasn't just about language, but about humility." },
      { en: "assume", es: "asumir / suponer", example: "I'll ask more questions and assume less." }
    ],
    grammarFocus: [
      {
        title: "Reported Speech con verbos como 'explain', 'reassure', 'realize'",
        explanation: "Se usa para contar lo que alguien dijo o pensó, generalmente con el verbo principal en pasado.",
        pattern: "Subject + explained/realized/reassured + that + clause",
        examples: ["Yuki explained that Robert had misunderstood the invitation.", "Robert realized his mistake.", "Yuki reassured him that it wasn't too late."]
      },
      {
        title: "Third Conditional para reflexionar sobre el pasado",
        explanation: "If + past perfect, ... might/would have + participio, para imaginar un resultado diferente si algo hubiera sido distinto.",
        pattern: "..., one that might not have happened if + subject + hadn't + participle",
        examples: ["This might not have happened if Yuki hadn't caught the misunderstanding in time.", "If Robert had asked for clarification, he wouldn't have made the mistake."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why did Robert's company arrange a local assistant?", options: ["To translate documents only", "To help him navigate meetings and translate when necessary", "To drive him around the city", "To cook his meals"], answer: 1 },
        { type: "mcq", text: "What mistake did Robert make at the dinner?", options: ["He was late to the dinner", "He smiled and nodded without understanding an invitation", "He refused to eat the food", "He forgot his business cards"], answer: 1 },
        { type: "mcq", text: "True or False: Mr. Tanaka was actually inviting Robert to visit his family's factory.", options: ["True", "False"], answer: 0 },
        { type: "mcq", text: "What can we infer about Yuki?", options: ["She is not good at her job", "She is perceptive and helps Robert avoid a bigger misunderstanding", "She doesn't care about Robert's success", "She was angry with Robert"], answer: 1 },
        { type: "order", text: "Robert exchanges business cards / Mr. Tanaka extends an invitation / Yuki clarifies the misunderstanding / Robert visits the factory", answer: "robert exchanges business cards mr. tanaka extends an invitation yuki clarifies the misunderstanding robert visits the factory" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "By smiling and nodding, Robert seemed ___, even though that wasn't his intention.", answer: "dismissive" },
        { type: "mcq", text: "What does \"humility\" mean?", options: ["Being extremely confident", "Being willing to admit you don't know or understand something", "Being angry about a mistake", "Being very formal"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Ella le explicó el malentendido con cuidado.\"", answer: "She explained the misunderstanding carefully." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses reported speech?", options: ["Yuki explained that Robert had misunderstood the invitation.", "Yuki explained that Robert has misunderstood the invitation, said today.", "Yuki explain that Robert misunderstood."], answer: 0 },
        { type: "fill-blank", text: "This might not ___ (happen) if Yuki hadn't caught the misunderstanding in time. (third conditional)", answer: "have happened" },
        { type: "mcq", text: "Which sentence correctly uses the third conditional?", options: ["If Robert had asked for clarification, he wouldn't have made the mistake.", "If Robert asked for clarification, he wouldn't make the mistake.", "If Robert will ask for clarification, he won't make the mistake."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I think I made things awkward." },
        { type: "pronunciation", text: "Next time, I'll ask more questions and assume less." }
      ],
      expressions: [
        { type: "mcq", text: "What does the title \"Lost in Translation\" suggest?", options: ["Someone got physically lost while traveling", "Meaning was misunderstood because of language or cultural differences", "A document was lost", "A translator quit the job"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words the main lesson Robert learned during his trip.", answer: "He learned that it's better to ask for clarification when you don't understand something rather than pretending to understand, and that humility is important when navigating a different culture and language." }
      ]
    }
  },

  {
    id: "story-vidacotidiana-b2",
    area: "vidacotidiana",
    level: "B2",
    title: "The Roommate Agreement",
    subtitle: "Dos compañeras de apartamento resuelven un conflicto sobre las tareas del hogar con una conversación honesta",
    text: `When Priya moved in with her new roommate, Jasmine, six months ago, everything seemed to go smoothly. They got along well, shared similar schedules, and rarely argued about anything significant. Lately, however, small tensions had started building up, mostly around household responsibilities.

Priya felt that she had been doing most of the cleaning, while Jasmine seemed to believe that chores were being handled fairly between them. Neither had brought it up directly, and the unspoken frustration had slowly grown into something that affected their daily interactions.

One evening, after finding the kitchen sink full of dirty dishes for the third day in a row, Priya decided she couldn't ignore the issue any longer.

"Can we talk about something?" she asked, trying to keep her tone calm rather than accusatory.

Jasmine looked up from her laptop, slightly surprised. "Sure, what's going on?"

"I've noticed that I've been doing most of the cleaning lately," Priya said carefully. "I don't want this to become a bigger issue, so I wanted to bring it up now."

Jasmine paused, clearly caught off guard. "Honestly, I hadn't realized it felt that unbalanced to you," she admitted. "I've been really busy with work, but that's not a good excuse. I should have communicated that instead of just letting things slide."

Rather than becoming defensive, Jasmine seemed genuinely willing to understand Priya's perspective, which made the conversation considerably easier than Priya had anticipated.

"I appreciate you saying that," Priya replied. "I think it would help if we had a clearer system, instead of just assuming things will balance out naturally."

They spent the next half hour discussing possible solutions. Instead of dividing chores strictly in half, which felt rigid given their different schedules, they decided on a rotating system: one person would be responsible for the kitchen each week, while the other handled the living room and bathroom, switching every Sunday.

"This way, neither of us has to think about it every single day," Jasmine suggested. "We just check whose week it is."

Priya agreed, adding that they should also address issues sooner in the future, rather than letting frustration build up silently.

"I think part of the problem was that neither of us said anything until it became annoying," Priya said. "Maybe we can check in occasionally, even when things seem fine."

Jasmine nodded. "That's fair. I'd rather have an honest conversation than guess what's bothering you."

They wrote their new system down and stuck it to the refrigerator, half as a practical reminder and half as a joke about how official it looked.

Over the following weeks, the new system worked surprisingly well. There were occasional reminders needed, but the resentment that had been quietly building disappeared almost entirely once both roommates felt heard and understood.

Looking back, Priya realized that the situation could have been resolved much earlier if she had simply spoken up sooner instead of assuming Jasmine would notice the imbalance on her own.

"I used to think bringing up small issues would seem petty," she told a friend later. "But ignoring them for months was actually worse for our friendship than one slightly uncomfortable conversation."

Jasmine, for her part, appreciated that Priya had approached the topic thoughtfully rather than waiting until she was truly upset. Their friendship, if anything, felt stronger for having navigated the disagreement honestly.`,
    summaryEs: "Priya y Jasmine acumulan tensión silenciosa por las tareas del hogar hasta que Priya decide hablarlo con calma. Juntas crean un sistema rotativo justo, y su amistad se fortalece al enfrentar el desacuerdo con honestidad.",
    vocab: [
      { en: "roommate", es: "compañero/a de apartamento", example: "When Priya moved in with her new roommate, Jasmine." },
      { en: "tension", es: "tensión", example: "Small tensions had started building up." },
      { en: "accusatory", es: "acusatorio/a", example: "She tried to keep her tone calm rather than accusatory." },
      { en: "unbalanced", es: "desequilibrado/a", example: "She hadn't realized it felt that unbalanced." },
      { en: "defensive", es: "a la defensiva", example: "Rather than becoming defensive, Jasmine seemed willing to understand." },
      { en: "rigid", es: "rígido/a", example: "Dividing chores strictly in half felt rigid." },
      { en: "rotating", es: "rotativo/a", example: "They decided on a rotating system." },
      { en: "resentment", es: "resentimiento", example: "The resentment that had been quietly building disappeared." },
      { en: "imbalance", es: "desequilibrio", example: "Jasmine would notice the imbalance on her own." },
      { en: "petty", es: "insignificante / mezquino/a", example: "She thought bringing up small issues would seem petty." }
    ],
    grammarFocus: [
      {
        title: "Third Conditional para reflexionar sobre decisiones pasadas",
        explanation: "If + past perfect, ... could/would have + participio, para pensar en cómo algo podría haber sido diferente.",
        pattern: "..., could have been resolved if + subject + had + participle",
        examples: ["The situation could have been resolved much earlier if she had simply spoken up sooner.", "If Priya hadn't said anything, the resentment would have kept growing."]
      },
      {
        title: "Present Perfect Continuous para situaciones que continúan",
        explanation: "have/has + been + verbo-ing describe una acción que comenzó en el pasado y continúa o afecta el presente.",
        pattern: "Subject + have/has + been + verb-ing",
        examples: ["I've noticed that I've been doing most of the cleaning lately.", "I've been really busy with work."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What was the main source of tension between Priya and Jasmine?", options: ["Money problems", "Household chores being unevenly shared", "A disagreement about a friend", "Loud music"], answer: 1 },
        { type: "mcq", text: "How did Priya approach the conversation with Jasmine?", options: ["She yelled at her", "She calmly brought up the issue instead of ignoring it", "She moved out immediately", "She wrote an angry note"], answer: 1 },
        { type: "mcq", text: "True or False: Jasmine already knew the chores felt unbalanced before Priya mentioned it.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Jasmine's reaction?", options: ["She got defensive and refused to change", "She was open and willing to find a solution", "She ignored Priya completely", "She blamed Priya for everything"], answer: 1 },
        { type: "order", text: "Priya notices the dirty dishes / Priya brings up the issue / They agree on a rotating system / Their friendship feels stronger", answer: "priya notices the dirty dishes priya brings up the issue they agree on a rotating system their friendship feels stronger" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Priya tried to keep her tone calm rather than ___.", answer: "accusatory" },
        { type: "mcq", text: "What does \"petty\" mean in this context?", options: ["Very important and serious", "Small and not worth worrying about (in a negative sense)", "Extremely expensive", "Very kind"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Decidieron un sistema rotativo.\"", answer: "They decided on a rotating system." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the third conditional?", options: ["The situation could have been resolved earlier if she had spoken up sooner.", "The situation could be resolved earlier if she speaks up sooner.", "The situation could have resolved earlier if she spoke up sooner."], answer: 0 },
        { type: "fill-blank", text: "I've ___ (be) really busy with work lately. (present perfect continuous)", answer: "been" },
        { type: "mcq", text: "Which sentence correctly uses present perfect continuous?", options: ["I've been doing most of the cleaning lately.", "I've done most of the cleaning since lately.", "I am doing most of the cleaning since lately."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I don't want this to become a bigger issue." },
        { type: "pronunciation", text: "I'd rather have an honest conversation than guess what's bothering you." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"letting things slide\" mean?", options: ["Cleaning very quickly", "Not addressing a problem and allowing it to continue", "Sliding on a wet floor", "Moving out of an apartment"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Priya learned from this experience.", answer: "She learned that addressing small problems honestly and early is better for a friendship than staying silent and letting frustration build up over time." }
      ]
    }
  },

  {
    id: "story-proyectos-b2",
    area: "proyectos",
    level: "B2",
    projectId: "core-project",
    title: "The Escalation",
    subtitle: "Una líder de QA debe escalar un problema crítico y defender su decisión ante liderazgo",
    text: `Two days before a major product launch, Sandra, the QA lead, discovered a critical issue that hadn't been caught during earlier testing cycles. Under certain conditions, transactions above a specific amount were being processed twice, a bug that could cause significant financial and reputational damage if it reached production.

Sandra immediately reported the issue to the development team, but the response she received was less urgent than she had expected. The lead developer explained that the bug had likely existed for months and that, since it hadn't been reported by any real users yet, it was probably a low-priority edge case rather than a widespread problem.

Sandra disagreed. She had already reproduced the issue three times under controlled conditions, and she was concerned that the specific circumstances required to trigger it simply hadn't occurred yet in production, rather than being genuinely rare.

Rather than accepting the developer's assessment without further evidence, Sandra spent the next several hours building a detailed report. She documented the exact steps required to reproduce the bug, calculated the potential financial impact if it occurred even occasionally in production, and included screenshots and logs to support her findings.

When she brought the updated report back to the development team, she was told that fixing the issue properly would likely delay the launch by at least three days — a delay that leadership had previously said they wanted to avoid at almost any cost.

Sandra realized that this decision was now beyond what she or the development team could resolve on their own. She requested an urgent meeting with the project director, a woman named Ingrid, who had the authority to make the final call.

During the meeting, Sandra presented her findings calmly and clearly, avoiding dramatic language while making the severity of the situation unmistakable. She explained what had been tested, what had been found, and what she believed the realistic consequences could be if the issue wasn't addressed before launch.

"I understand that delaying the launch is costly," Sandra said. "But I believe the cost of a duplicate-transaction bug reaching real customers would be significantly higher, both financially and in terms of trust."

Ingrid asked several pointed questions, wanting to understand exactly how the bug had been reproduced and how confident Sandra was that a fix could be properly tested within a reasonable timeframe.

"If we fix it today," Sandra explained, "my team can complete focused regression testing within two days. That would only add a small delay, not the full three days the developers estimated."

After considering the information carefully, Ingrid made her decision. The launch would be delayed by two days, and the fix would be treated as the team's top priority until it was fully verified.

"Thank you for pushing on this," Ingrid told Sandra afterward. "It would have been much easier for you to accept the initial explanation and move on."

"I considered it," Sandra admitted honestly. "But this felt like exactly the kind of issue that gets excused because it hasn't happened yet, not because it isn't real."

The fix was implemented and tested over the following two days, and the launch proceeded successfully, with no transaction issues reported afterward. Months later, during a retrospective meeting, the incident was referenced as an example of the importance of listening carefully to QA concerns, even when they created inconvenient timing.

Sandra herself viewed the experience differently. For her, it wasn't really about being right. It was about making sure that decisions with real consequences were made with complete information, rather than convenient assumptions.`,
    summaryEs: "Sandra, líder de QA, descubre un error crítico de doble cobro días antes de un lanzamiento. A pesar de la resistencia inicial, construye evidencia sólida y escala la decisión a liderazgo, logrando corregir el problema antes de salir a producción.",
    vocab: [
      { en: "critical", es: "crítico/a", example: "Sandra discovered a critical issue." },
      { en: "reproduce", es: "reproducir (un error)", example: "She had already reproduced the issue three times." },
      { en: "edge case", es: "caso extremo / poco frecuente", example: "It was probably a low-priority edge case." },
      { en: "assessment", es: "evaluación", example: "Rather than accepting the developer's assessment." },
      { en: "regression testing", es: "pruebas de regresión", example: "My team can complete focused regression testing." },
      { en: "severity", es: "gravedad", example: "Making the severity of the situation unmistakable." },
      { en: "escalate", es: "escalar (un problema)", example: "This decision was now beyond what they could resolve on their own." },
      { en: "authority", es: "autoridad", example: "Ingrid had the authority to make the final call." },
      { en: "timeframe", es: "plazo de tiempo", example: "Within a reasonable timeframe." },
      { en: "priority", es: "prioridad", example: "The fix would be treated as the team's top priority." }
    ],
    grammarFocus: [
      {
        title: "Passive Voice para reportes técnicos formales",
        explanation: "Se usa ampliamente en reportes de QA y negocio para enfocarse en el proceso o resultado.",
        pattern: "Subject + be + past participle",
        examples: ["Transactions were being processed twice.", "The issue hadn't been caught during earlier testing.", "The fix was implemented and tested."]
      },
      {
        title: "Reported Speech con verbos de opinión (explain, believe, admit)",
        explanation: "Se usa para reportar lo que alguien piensa o afirma, con el verbo principal generalmente en pasado.",
        pattern: "Subject + explained/believed/admitted + that + clause",
        examples: ["Sandra explained what had been tested.", "She believed the realistic consequences could be severe.", "Sandra admitted that she had considered accepting the explanation."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What critical issue did Sandra discover?", options: ["The app crashed on startup", "Transactions above a certain amount were being processed twice", "The login page was broken", "The database was too slow"], answer: 1 },
        { type: "mcq", text: "How did the lead developer initially respond?", options: ["He agreed it was extremely urgent", "He thought it was probably a low-priority edge case", "He refused to look into it", "He fixed it immediately"], answer: 1 },
        { type: "mcq", text: "True or False: Sandra accepted the developer's assessment without pushing further.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Ingrid?", options: ["She ignored Sandra's concerns completely", "She carefully considered the evidence before making a decision", "She refused to delay the launch under any circumstance", "She didn't have authority to decide"], answer: 1 },
        { type: "order", text: "Sandra discovers the bug / Sandra builds a detailed report / Sandra meets with Ingrid / The launch is delayed by two days", answer: "sandra discovers the bug sandra builds a detailed report sandra meets with ingrid the launch is delayed by two days" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The developer thought it was probably a low-priority ___ case.", answer: "edge" },
        { type: "mcq", text: "What does \"escalate\" mean in this context?", options: ["To make something smaller", "To bring an issue to someone with more authority to decide", "To ignore a problem", "To celebrate a success"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Ella reprodujo el problema tres veces.\"", answer: "She reproduced the problem three times." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses the passive voice?", options: ["Transactions were being processed twice.", "Transactions being processed twice.", "They was processing transactions twice."], answer: 0 },
        { type: "fill-blank", text: "Sandra ___ (explain) what had been tested and what had been found. (reported speech, past)", answer: "explained" },
        { type: "mcq", text: "Which sentence correctly reports what Sandra believed?", options: ["She believed the realistic consequences could be severe.", "She believe the realistic consequences could be severe.", "She believing the realistic consequences could be severe."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I believe the cost would be significantly higher." },
        { type: "pronunciation", text: "Thank you for pushing on this." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"push on this\" mean?", options: ["To physically push an object", "To keep insisting or advocating for something important", "To give up on an idea", "To push a button"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why Sandra decided to escalate the issue instead of accepting the developer's initial explanation.", answer: "Because she had solid evidence that the bug was real and could cause serious problems, and she believed the decision needed to be made with complete information rather than convenient assumptions." }
      ]
    }
  },

  // -------------------------------------------------------------- C1 wave --

  {
    id: "story-cine-c1",
    area: "cine",
    level: "C1",
    title: "The Retrospective",
    subtitle: "Un crítico de cine veterano reconsidera, décadas después, una reseña que hundió una película",
    text: `Rarely does a critic admit, publicly and without qualification, that they were wrong. Yet that is precisely what Malcolm Webb found himself compelled to do, some thirty years after he had dismissed a modest, low-budget film as "forgettable at best, insulting to the intelligence at worst."

The film in question, a quiet drama about a mother navigating grief in a small coastal town, had barely registered at the box office upon its original release. Malcolm's review, published in a respected film journal, had been widely cited as one of the reasons the film failed to gain traction, its distributor having pulled it from theaters within a fortnight.

Decades later, invited to speak at a retrospective screening organized by a university film society, Malcolm reluctantly agreed to revisit the film he had so thoroughly dismantled in print. He assumed, not unreasonably, that time would only confirm his original judgment.

What he had not anticipated was the sheer discomfort of watching the film again, not because it was poorly made, but because it wasn't. Viewed without the pressure of a looming deadline, and without the cynicism that had, he now suspected, colored much of his early career, the film revealed a restraint and emotional precision he had entirely failed to recognize the first time.

Had he been a younger critic, eager to distinguish himself through severity rather than insight, he might have understood his earlier misjudgment. But Malcolm had never considered himself that kind of writer. The realization, therefore, was considerably more unsettling than a simple change of opinion.

During the post-screening discussion, a student in the audience asked him directly whether he regretted his original review. Malcolm paused for a long moment before answering.

"I do," he admitted. "Not merely because I now see merit I once missed, but because I suspect my review contributed, however marginally, to this film never finding the audience it deserved. That is not a comfortable thing to sit with."

The student pressed further, asking what had changed — the film, or him.

"The film hasn't changed a single frame," Malcolm said. "I have. Were I to be entirely honest, I think I mistook restraint for indifference back then. I wanted films to announce their intentions loudly, and this one refused to. I read that refusal as a failure of ambition, when in fact it was the opposite."

He went on to explain that revisiting the film had prompted a broader reckoning with his own critical instincts, particularly the tendency, common among younger critics eager to establish a reputation, to equate harshness with rigor. It was, he admitted, a far easier position to defend than genuine curiosity, which required sitting with uncertainty rather than delivering a verdict.

Following the retrospective, Malcolm wrote a second piece on the film, this time for a much wider publication. He was careful not to frame it as a simple reversal, aware that doing so risked seeming performative, a critic manufacturing a redemption narrative for his own benefit. Instead, he attempted something more difficult: an honest account of how and why a critic's judgment can fail, not through incompetence, but through the particular blindness that comes with certainty.

The piece was, by his own admission, one of the hardest he had ever written. It required him to hold two things simultaneously that felt, at times, contradictory: a defense of criticism as a discipline worth taking seriously, and an acknowledgment that even careful, well-intentioned criticism could get something fundamentally wrong.

Whether the essay changed how readers thought about the film, Malcolm couldn't say with certainty. But it changed, unmistakably, how he approached every review he wrote afterward. He found himself lingering longer before forming conclusions, suspicious now of the particular satisfaction that came with a clever, dismissive line.

Some colleagues privately thought he had grown soft with age. Malcolm suspected, more charitably toward himself, that he had simply grown more honest about the limits of a single viewing, a single mood, a single moment in a critic's career — and about how easily conviction can be mistaken for correctness.`,
    summaryEs: "Décadas después de hundir una película con una reseña dura, el crítico Malcolm Webb la revisita en una retrospectiva universitaria y descubre que se equivocó. El proceso lo lleva a reflexionar públicamente sobre los límites de la certeza crítica.",
    vocab: [
      { en: "retrospective", es: "retrospectiva", example: "Malcolm was invited to speak at a retrospective screening." },
      { en: "dismantle (critically)", es: "desmontar / destrozar (una obra en una reseña)", example: "The film he had so thoroughly dismantled in print." },
      { en: "restraint", es: "contención / mesura", example: "The film revealed a restraint he had failed to recognize." },
      { en: "unsettling", es: "inquietante / perturbador", example: "The realization was considerably more unsettling." },
      { en: "reckoning", es: "ajuste de cuentas / reflexión profunda", example: "It prompted a broader reckoning with his own instincts." },
      { en: "rigor", es: "rigor", example: "To equate harshness with rigor." },
      { en: "performative", es: "performativo/a (hecho para la imagen, no genuino)", example: "Doing so risked seeming performative." },
      { en: "redemption narrative", es: "narrativa de redención", example: "A critic manufacturing a redemption narrative for his own benefit." },
      { en: "charitably", es: "de forma indulgente / generosa", example: "Malcolm suspected, more charitably toward himself..." },
      { en: "conviction", es: "convicción", example: "How easily conviction can be mistaken for correctness." }
    ],
    grammarFocus: [
      {
        title: "Inversión con adverbios/condicionales para énfasis formal",
        explanation: "En registro formal o literario, se puede invertir el orden sujeto-verbo después de adverbios negativos o en condicionales sin \"if\", para dar énfasis.",
        pattern: "Rarely/Had + subject + verb...",
        examples: ["Rarely does a critic admit that they were wrong.", "Had he been a younger critic, he might have understood his misjudgment.", "Were I to be entirely honest, I think I mistook restraint for indifference."]
      },
      {
        title: "Cláusulas subordinadas complejas y conectores formales",
        explanation: "El uso de conectores como \"not merely because\", \"however marginally\", \"whether... or\" permite construir argumentos matizados típicos del registro C1.",
        pattern: "..., not merely because..., but because...",
        examples: ["Not merely because I now see merit I once missed, but because I suspect my review contributed to this film never finding its audience.", "Whether the essay changed how readers thought about the film, Malcolm couldn't say with certainty."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What did Malcolm's original review say about the film?", options: ["It praised the film highly", "It called it forgettable and insulting to the intelligence", "It didn't mention the film's quality", "It focused only on the actors"], answer: 1 },
        { type: "mcq", text: "Why did Malcolm revisit the film decades later?", options: ["He was forced to by his editor", "He was invited to speak at a university retrospective screening", "He wanted to write a book", "A student asked him to"], answer: 1 },
        { type: "mcq", text: "True or False: Malcolm believed the film itself had changed since he first watched it.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What does Malcolm ultimately conclude about his younger self's judgment?", options: ["He was right all along", "He mistook the film's restraint for a lack of ambition", "The film was truly bad", "He never actually watched the film the first time"], answer: 1 },
        { type: "order", text: "Malcolm writes his original dismissive review / Malcolm attends the retrospective screening / A student asks if he regrets his review / Malcolm writes a second, more reflective piece", answer: "malcolm writes his original dismissive review malcolm attends the retrospective screening a student asks if he regrets his review malcolm writes a second, more reflective piece" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Malcolm had thoroughly ___ the film in his original, harsh review.", answer: "dismantled" },
        { type: "mcq", text: "What does \"performative\" mean in this context?", options: ["Done sincerely and privately", "Done to create a certain impression for an audience, rather than out of genuine feeling", "Related to a stage performance only", "Extremely emotional"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Él admitió que se había equivocado.\"", answer: "He admitted that he had been wrong." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses inversion for emphasis?", options: ["Rarely does a critic admit that they were wrong.", "Rarely a critic does admit that they were wrong.", "A critic rarely does admit that they were wrong."], answer: 0 },
        { type: "fill-blank", text: "___ he been a younger critic, he might have understood his misjudgment. (inversion, no 'if')", answer: "Had" },
        { type: "mcq", text: "Which sentence uses a formal contrastive connector correctly?", options: ["Not merely because I now see merit I once missed, but because I suspect my review contributed to its failure.", "Not merely I see merit, but I suspect my review contributed.", "Because not merely I see merit, but because I suspect."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I mistook restraint for indifference." },
        { type: "pronunciation", text: "That is not a comfortable thing to sit with." }
      ],
      expressions: [
        { type: "mcq", text: "What does it mean to \"sit with\" an uncomfortable realization?", options: ["To physically sit down", "To accept and reflect on something difficult, without rushing to resolve it", "To ignore a problem completely", "To argue against a realization"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Malcolm means when he says he \"mistook restraint for indifference\".", answer: "He means that he originally interpreted the film's quiet, understated style as a lack of ambition or effort, when it was actually a deliberate artistic choice that he failed to appreciate at the time." }
      ]
    }
  },

  {
    id: "story-tecnologia-c1",
    area: "tecnologia",
    level: "C1",
    title: "The Architecture Review",
    subtitle: "Una arquitecta de sistemas debe entregar una crítica difícil pero constructiva sobre el diseño de un colega",
    text: `Not once during her twelve years as a systems architect had Naomi found it easy to critique a colleague's design in front of their peers, regardless of how much experience she accumulated. That discomfort resurfaced sharply the morning she was asked to review a proposal submitted by Theo, a talented but relatively junior engineer who had spent the better part of two months designing a new data pipeline for the company's analytics platform.

The proposal was, in many respects, impressive. Theo had clearly thought carefully about scalability, and his diagrams were meticulously documented. What concerned Naomi, however, was a fundamental assumption buried deep within the architecture: the system relied on a single point of failure that, while unlikely to cause problems under current traffic levels, would almost certainly become a serious liability were the platform to grow as aggressively as leadership was projecting.

Had this been a minor implementation detail, Naomi might have raised it privately after the meeting. But the flaw was structural, embedded in decisions that would be considerably more expensive to reverse the longer they went unaddressed. She felt she had little choice but to raise it during the formal review, in front of the wider engineering team.

She began carefully, acknowledging the considerable strengths of Theo's design before addressing her concern. "I want to be clear that the scalability thinking here is genuinely strong," she said. "There's one assumption, though, that I think deserves more scrutiny before we commit to this direction."

She walked through her reasoning methodically, using a hypothetical traffic scenario to illustrate how the single point of failure could, under sufficiently high load, become not merely inconvenient but catastrophic. Several engineers in the room nodded, evidently persuaded, while others remained visibly uncertain, unwilling to commit to an opinion before hearing Theo's response.

Theo, to his credit, didn't become defensive, though it was clear the critique stung. He asked several pointed clarifying questions, seemingly less interested in defending his original design than in understanding precisely where his reasoning had gone astray.

"I think I was optimizing for the traffic we have now," he admitted eventually, "rather than the traffic we're being told to expect in eighteen months. That's a fair criticism."

What followed was, in Naomi's estimation, one of the more productive design discussions she had witnessed in years. Rather than abandoning Theo's work entirely, the team collaboratively identified a way to introduce redundancy into the specific component that concerned Naomi, without requiring a wholesale redesign of the rest of the system — a compromise that preserved much of Theo's original thinking while addressing its most significant vulnerability.

Afterward, Theo approached Naomi privately. "I appreciate that you didn't just tell me it was wrong," he said. "You actually walked through why, which made it a lot easier to hear."

Naomi considered this for a moment before responding. "Early in my career, someone did the opposite to me," she said. "They dismissed a proposal I'd worked on for weeks with barely an explanation, and it took me a long time to trust my own judgment again afterward. I try not to repeat that, even when the stakes feel high."

It was a small exchange, but one that stayed with Theo far longer than the technical details of the redesign itself. Months later, reviewing a junior colleague's proposal of his own, he found himself instinctively adopting Naomi's approach: acknowledging strength before naming weakness, and explaining reasoning rather than simply asserting authority.

Whether this shift in his own habits would have occurred without that particular review, Theo couldn't say for certain. But he suspected that how a critique is delivered often matters just as much, if not more, than whether the critique itself is correct.`,
    summaryEs: "Naomi debe señalar una falla estructural en el diseño de Theo durante una revisión formal. Su manera cuidadosa y respetuosa de dar la crítica transforma la conversación en una de las discusiones de diseño más productivas del equipo, dejando una huella duradera en Theo.",
    vocab: [
      { en: "scalability", es: "escalabilidad", example: "Theo had clearly thought carefully about scalability." },
      { en: "meticulously", es: "meticulosamente", example: "His diagrams were meticulously documented." },
      { en: "liability", es: "pasivo / riesgo (responsabilidad)", example: "It would become a serious liability." },
      { en: "structural", es: "estructural", example: "The flaw was structural." },
      { en: "scrutiny", es: "escrutinio", example: "It deserves more scrutiny." },
      { en: "redundancy", es: "redundancia", example: "The team introduced redundancy into the component." },
      { en: "vulnerability", es: "vulnerabilidad", example: "Addressing its most significant vulnerability." },
      { en: "wholesale", es: "total / completo/a", example: "Without requiring a wholesale redesign." },
      { en: "astray", es: "extraviado/a (fig. equivocado)", example: "Where his reasoning had gone astray." },
      { en: "instinctively", es: "instintivamente", example: "He found himself instinctively adopting Naomi's approach." }
    ],
    grammarFocus: [
      {
        title: "Inversión formal (Not once..., Had this been...)",
        explanation: "El registro formal usa inversión sujeto-verbo tras expresiones negativas o en condicionales sin 'if' para dar énfasis o formalidad.",
        pattern: "Not once + auxiliary + subject...; Had + subject + participle...",
        examples: ["Not once during her twelve years had Naomi found it easy to critique a colleague.", "Had this been a minor detail, she might have raised it privately."]
      },
      {
        title: "Cláusulas condicionales mixtas y matizadas ('were... to')",
        explanation: "Estructuras como \"were the platform to grow\" son una forma formal de expresar condiciones hipotéticas, alternativa a \"if the platform were to grow\".",
        pattern: "..., were + subject + to + verb, ...",
        examples: ["It would become a serious liability were the platform to grow as aggressively as projected.", "Were this issue to go unaddressed, the cost would increase significantly."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What was the fundamental flaw Naomi identified in Theo's design?", options: ["Poor documentation", "A single point of failure that could become a serious liability as the platform grew", "Incorrect use of colors in diagrams", "A missing test case"], answer: 1 },
        { type: "mcq", text: "How did Naomi begin her critique?", options: ["By immediately criticizing the flaw", "By acknowledging the strengths of the design before raising her concern", "By ignoring the issue", "By asking Theo to redo the whole design"], answer: 1 },
        { type: "mcq", text: "True or False: Theo became defensive and refused to consider Naomi's feedback.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Naomi's own past experience?", options: ["She has never received harsh feedback herself", "She once received dismissive feedback and it affected her confidence", "She dislikes giving feedback to junior engineers", "She was Theo's original manager"], answer: 1 },
        { type: "order", text: "Theo designs the data pipeline / Naomi raises her concern in the review / The team identifies a compromise solution / Theo applies Naomi's approach with a junior colleague", answer: "theo designs the data pipeline naomi raises her concern in the review the team identifies a compromise solution theo applies naomi's approach with a junior colleague" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The single point of failure would become a serious ___ as traffic grew.", answer: "liability" },
        { type: "mcq", text: "What does \"scrutiny\" mean?", options: ["Careful and close examination", "A quick glance", "A celebration", "A financial cost"], answer: 0 },
        { type: "short-answer", text: "Translate into English: \"Ella explicó su razonamiento con cuidado.\"", answer: "She explained her reasoning carefully." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses formal inversion?", options: ["Not once during her twelve years had Naomi found it easy.", "Not once during her twelve years Naomi had found it easy.", "Naomi not once had found it easy during her twelve years."], answer: 0 },
        { type: "fill-blank", text: "It would become a serious liability ___ the platform to grow as projected. (formal conditional)", answer: "were" },
        { type: "mcq", text: "Which sentence correctly uses a mixed/formal conditional?", options: ["Were this issue to go unaddressed, the cost would increase significantly.", "If this issue were to go unaddressed, it will increase the cost.", "This issue going unaddressed would increased the cost."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "There's one assumption that deserves more scrutiny." },
        { type: "pronunciation", text: "I appreciate that you didn't just tell me it was wrong." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"gone astray\" mean in \"where his reasoning had gone astray\"?", options: ["Became correct", "Went in the wrong direction or made an error", "Disappeared completely", "Was explained clearly"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words the lesson Theo takes away from this experience, beyond the technical fix.", answer: "He learns that how feedback is delivered — acknowledging strengths and explaining reasoning rather than just asserting authority — matters as much as whether the feedback itself is correct, and he applies this approach later with a junior colleague." }
      ]
    }
  },

  {
    id: "story-viajes-c1",
    area: "viajes",
    level: "C1",
    title: "The Overnight Layover",
    subtitle: "Una escala nocturna inesperada da lugar a un encuentro que cambia la perspectiva de una viajera",
    text: `Few things test the patience of even the most seasoned traveler quite like an unplanned overnight layover in an unfamiliar city, and it was precisely this predicament in which Isabel found herself when her connecting flight was cancelled due to a mechanical fault, stranding her at an airport she had never intended to see beyond its transit lounge.

Had the airline offered compensation immediately, or had a hotel voucher materialized without the customary hour-long queue, Isabel might have simply slept through the delay and thought little more of it. Instead, by the time she finally secured a room, it was well past midnight, and she found herself far too restless, despite her exhaustion, to sleep.

Rather than lying awake in an unfamiliar hotel room, she decided, somewhat impulsively, to venture out into the city itself, reasoning that she might as well salvage something meaningful from an otherwise wasted eighteen hours. The night was unseasonably warm, and the streets near her hotel, though largely deserted, possessed a quiet charm that daytime crowds would likely have obscured entirely.

It was during this aimless wandering that she encountered Marcus, an elderly man sitting alone outside a small, dimly lit café that, remarkably, remained open despite the hour. He was nursing a cup of coffee and reading, of all things, a well-worn paperback in a language Isabel didn't recognize.

Their conversation began, as such encounters often do, over something trivial — Isabel's admittedly poor attempt at ordering coffee in the local language — but soon deepened considerably. Marcus, it emerged, had lived in the city for over four decades, having relocated there in his thirties following what he described only vaguely as "circumstances that no longer matter."

What struck Isabel most, as their conversation unfolded over the following two hours, was not merely what Marcus said, but the unhurried manner in which he said it, entirely unburdened by the urgency that seemed to characterize nearly every interaction she had grown accustomed to in her professional life. He spoke of the city's transformation over the decades with neither nostalgia nor bitterness, simply observation, as though he had long ago made peace with the fact that places, like people, are rarely static.

"You seem remarkably unbothered," Isabel observed at one point, "for someone who has presumably had this city change entirely around him."

Marcus considered this for a moment before responding. "Change bothers you most," he said, "when you insist a place remain exactly as you first knew it. I stopped insisting on that a long time ago."

The remark stayed with Isabel long after their conversation ended, well after she had returned to her hotel room and, eventually, boarded her rescheduled flight the following afternoon. It wasn't so much the observation itself that lingered, profound as it was, but rather the ease with which Marcus had arrived at it — an ease that Isabel, accustomed to a career built on constant forward momentum, found she rather envied.

Months later, recounting the story to a colleague who had asked, somewhat dismissively, whether the delay had at least been "worth it," Isabel found herself hesitating before answering.

"I missed an important meeting because of that delay," she admitted. "But I'm not sure I'd trade the conversation for having made it on time."

Her colleague looked unconvinced, evidently regarding the sentiment as the kind of thing one says about an inconvenience in retrospect, once its cost has faded sufficiently from memory. Isabel, however, wasn't entirely certain her colleague was wrong to be skeptical — only that, skeptical or not, she meant it all the same.`,
    summaryEs: "Un vuelo cancelado deja a Isabel varada toda una noche en una ciudad desconocida. Un encuentro casual con un anciano llamado Marcus en un café le ofrece una perspectiva inesperada sobre el cambio y la aceptación que la acompaña mucho después del viaje.",
    vocab: [
      { en: "predicament", es: "aprieto / situación difícil", example: "It was precisely this predicament in which Isabel found herself." },
      { en: "stranded", es: "varado/a", example: "Stranding her at an airport she had never intended to see." },
      { en: "voucher", es: "vale / cupón", example: "Had a hotel voucher materialized without the queue." },
      { en: "impulsively", es: "impulsivamente", example: "She decided, somewhat impulsively, to venture out." },
      { en: "salvage", es: "rescatar / salvar (algo de una situación)", example: "She might as well salvage something meaningful." },
      { en: "aimless", es: "sin rumbo", example: "It was during this aimless wandering." },
      { en: "unhurried", es: "sin prisa / calmado/a", example: "The unhurried manner in which he said it." },
      { en: "nostalgia", es: "nostalgia", example: "He spoke of the transformation with neither nostalgia nor bitterness." },
      { en: "static", es: "estático/a", example: "Places, like people, are rarely static." },
      { en: "momentum", es: "impulso / dinamismo", example: "A career built on constant forward momentum." }
    ],
    grammarFocus: [
      {
        title: "Inversión condicional formal (Had + sujeto...)",
        explanation: "En narrativa formal, se puede omitir 'if' e invertir el orden para condicionales hipotéticos.",
        pattern: "Had + subject + past participle, ...",
        examples: ["Had the airline offered compensation immediately, Isabel might have slept through the delay.", "Had she stayed in the hotel, she would never have met Marcus."]
      },
      {
        title: "Cláusulas relativas y aposiciones complejas",
        explanation: "El uso de cláusulas insertadas (\"it was precisely this predicament in which...\", \"Marcus, it emerged, had lived...\") añade matiz e información sin interrumpir la oración principal — típico del registro C1.",
        pattern: "Subject, [inserted clause], + verb...",
        examples: ["Marcus, it emerged, had lived in the city for over four decades.", "The streets, though largely deserted, possessed a quiet charm."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "Why was Isabel stranded overnight?", options: ["She missed her flight on purpose", "Her connecting flight was cancelled due to a mechanical fault", "She wanted to explore the city", "Her hotel was overbooked"], answer: 1 },
        { type: "mcq", text: "Who did Isabel meet during her walk?", options: ["A hotel employee", "An elderly man named Marcus at a café", "A flight attendant", "Another stranded passenger from her flight"], answer: 1 },
        { type: "mcq", text: "True or False: Marcus seemed bitter and unhappy about how the city had changed.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What can we infer about Isabel's professional life?", options: ["It is slow-paced and relaxed", "It is fast-paced, with a strong sense of urgency and forward momentum", "She dislikes her job completely", "She travels for pleasure only"], answer: 1 },
        { type: "order", text: "Isabel's flight is cancelled / Isabel walks through the city at night / Isabel meets Marcus at a café / Isabel tells a colleague about the experience months later", answer: "isabel's flight is cancelled isabel walks through the city at night isabel meets marcus at a café isabel tells a colleague about the experience months later" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Isabel decided to venture out ___, without much planning.", answer: "impulsively" },
        { type: "mcq", text: "What does \"stranded\" mean?", options: ["Comfortably settled somewhere", "Unable to leave a place, usually unexpectedly", "Traveling by boat", "Extremely tired"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"Ella decidió salvar algo significativo del retraso.\"", answer: "She decided to salvage something meaningful from the delay." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses formal conditional inversion?", options: ["Had the airline offered compensation immediately, she might have slept through the delay.", "Had the airline offer compensation immediately, she might have slept.", "The airline had offered compensation immediately, she might have slept."], answer: 0 },
        { type: "fill-blank", text: "Marcus, it ___ (emerge), had lived in the city for over four decades.", answer: "emerged" },
        { type: "mcq", text: "Which sentence correctly uses an inserted relative clause?", options: ["The streets, though largely deserted, possessed a quiet charm.", "The streets though largely deserted possessed a quiet charm they were.", "The streets was largely deserted, possessed a quiet charm."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "Change bothers you most when you insist a place remain exactly as you first knew it." },
        { type: "pronunciation", text: "I'm not sure I'd trade the conversation for having made it on time." }
      ],
      expressions: [
        { type: "mcq", text: "What does it mean to \"make peace with\" something?", options: ["To start a war", "To accept something difficult without continuing to resist it", "To completely forget about something", "To argue about something"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what Marcus meant by saying change bothers people most when they insist a place remain exactly as they first knew it.", answer: "He meant that resistance to change, not change itself, is often the real source of discomfort — accepting that places and people naturally evolve makes that change easier to live with." }
      ]
    }
  },

  {
    id: "story-vidacotidiana-c1",
    area: "vidacotidiana",
    level: "C1",
    title: "The Inheritance",
    subtitle: "Tres hermanos negocian una decisión delicada tras heredar la casa de su madre",
    text: `Grief, David had come to realize in the months following his mother's death, rarely announces itself as a single, identifiable emotion. More often, it arrives disguised as irritability, or indecision, or, in his case, an unexpected reluctance to discuss what should have been a straightforward matter: what to do with the house.

The house in question, a modest but sentimentally significant property where David and his two sisters, Claire and Beatriz, had grown up, now sat at the center of a conversation none of the three siblings seemed particularly eager to have. Their mother's will had left the property to be divided equally among them, a decision that was, on paper, admirably fair and, in practice, considerably more complicated than any of them had anticipated.

Claire, ever the pragmatist, favored selling the house promptly, arguing that prolonging the decision would only make an already difficult situation more emotionally fraught, not less. Beatriz, by contrast, couldn't bring herself to consider selling at all, at least not yet, insisting that doing so felt less like a practical decision and more like a final, irreversible severing of their connection to their mother.

David found himself caught, uncomfortably, between the two positions, sympathetic to both yet fully persuaded by neither. It was, he suspected, precisely the kind of situation in which there existed no answer capable of satisfying everyone, only varying degrees of acceptable compromise.

The disagreement came to a head one weekend when the three siblings gathered at the house, ostensibly to begin sorting through their mother's belongings, though the conversation inevitably circled back to the property itself.

"I'm not saying we sell tomorrow," Claire said, her frustration evident despite her attempt to remain measured. "I'm saying that avoiding the conversation entirely isn't actually protecting anything. It's just delaying something we'll eventually have to face regardless."

Beatriz, visibly hurt, replied that Claire's practicality, however logical, felt at times indistinguishable from indifference. "It's not that I don't understand your reasoning," she said. "It's that I'm not ready to reduce this house to a transaction, even a necessary one."

It was David, uncharacteristically, who eventually broke the tension, not by proposing a solution but by naming, plainly, what he suspected they were all avoiding.

"I don't think this is really about the house," he said quietly. "I think it's that once we sell it, or even seriously discuss selling it, it'll feel like she's really gone. Like there's nothing left to hold onto."

The room fell silent. Claire, who had been prepared to argue her position further, found she had nothing immediately to say. Beatriz, for her part, simply nodded, unable to trust her voice not to break.

They didn't resolve anything definitively that weekend, nor, David suspected, could they have reasonably been expected to. What they arrived at instead was something more modest but, in its own way, more valuable: an agreement to revisit the conversation in six months, once the sharpest edges of their grief had, presumably, softened somewhat, and an acknowledgment, spoken aloud for the first time, that their disagreement had never really been about real estate at all.

In the months that followed, the three siblings found themselves talking more often, not less, drawn together rather than divided by the admission that had finally been spoken. When they did eventually revisit the question of the house, the conversation, while still difficult, proceeded with a candor that had been entirely absent before.

Whether they ultimately decided to sell, David reflected afterward, mattered rather less than he had once assumed. What mattered, it turned out, was that they had finally allowed themselves to grieve honestly, together, rather than negotiating around the edges of a loss none of them had yet fully named.`,
    summaryEs: "Tras la muerte de su madre, David y sus hermanas Claire y Beatriz no logran ponerse de acuerdo sobre qué hacer con la casa familiar. David identifica que el verdadero conflicto es el duelo no expresado, lo que transforma la conversación y fortalece su relación.",
    vocab: [
      { en: "grief", es: "duelo", example: "Grief rarely announces itself as a single emotion." },
      { en: "indecision", es: "indecisión", example: "It arrives disguised as irritability, or indecision." },
      { en: "sentimentally", es: "sentimentalmente", example: "A sentimentally significant property." },
      { en: "fraught", es: "cargado/a de tensión", example: "More emotionally fraught, not less." },
      { en: "pragmatist", es: "pragmático/a", example: "Claire, ever the pragmatist." },
      { en: "irreversible", es: "irreversible", example: "A final, irreversible severing of their connection." },
      { en: "severing", es: "corte / ruptura", example: "An irreversible severing of their connection to their mother." },
      { en: "ostensibly", es: "aparentemente", example: "Ostensibly to begin sorting through their mother's belongings." },
      { en: "indifference", es: "indiferencia", example: "Felt at times indistinguishable from indifference." },
      { en: "candor", es: "franqueza / honestidad", example: "The conversation proceeded with a candor absent before." }
    ],
    grammarFocus: [
      {
        title: "Adverbios y cláusulas de énfasis matizado (however, ever the..., not..., but...)",
        explanation: "Expresiones como \"however logical\", \"ever the pragmatist\" y \"not X, but Y\" permiten matizar afirmaciones de forma elegante en registro formal.",
        pattern: "..., however + adjective, ...; not X but Y",
        examples: ["Claire's practicality, however logical, felt at times indistinguishable from indifference.", "It felt less like a practical decision and more like a final severing of their connection."]
      },
      {
        title: "Cláusulas nominales con 'what' (What mattered..., What they arrived at...)",
        explanation: "Las cláusulas que comienzan con 'what' funcionan como sujeto u objeto de la oración, típicas de un estilo reflexivo y formal.",
        pattern: "What + clause + verb + complement",
        examples: ["What mattered, it turned out, was that they had finally allowed themselves to grieve honestly.", "What they arrived at instead was something more modest but valuable."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What decision were the three siblings struggling with?", options: ["Where to hold the funeral", "What to do with their mother's house", "How to divide furniture", "Who would give a speech"], answer: 1 },
        { type: "mcq", text: "What was Claire's position?", options: ["She wanted to keep the house forever", "She favored selling the house promptly", "She refused to discuss it", "She wanted to rent it out"], answer: 1 },
        { type: "mcq", text: "True or False: Beatriz felt ready to sell the house immediately.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What did David realize was the real issue underlying the disagreement?", options: ["Money problems", "The fear that selling the house would make their mother's absence feel final", "A disagreement about who deserved more inheritance", "Anger about the will itself"], answer: 1 },
        { type: "order", text: "Their mother's will divides the house equally / Claire and Beatriz disagree about selling / David names the real issue / The siblings agree to revisit the conversation later", answer: "their mother's will divides the house equally claire and beatriz disagree about selling david names the real issue the siblings agree to revisit the conversation later" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "Selling the house felt like an ___ severing of their connection to their mother.", answer: "irreversible" },
        { type: "mcq", text: "What does \"candor\" mean?", options: ["Anger", "Honesty and openness in speaking", "Confusion", "Silence"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"El duelo rara vez se anuncia como una sola emoción.\"", answer: "Grief rarely announces itself as a single emotion." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses a nominal 'what' clause?", options: ["What mattered was that they had finally grieved honestly together.", "What mattered it was that they had finally grieved.", "It what mattered was that they had grieved."], answer: 0 },
        { type: "fill-blank", text: "Claire's practicality, ___ logical, felt at times indistinguishable from indifference.", answer: "however" },
        { type: "mcq", text: "Which sentence uses 'not... but...' correctly for emphasis?", options: ["It felt less like a decision and more like a final severing of their connection.", "It felt not a decision but more like severing.", "It felt less a decision, more severing but."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "I don't think this is really about the house." },
        { type: "pronunciation", text: "It's that I'm not ready to reduce this house to a transaction." }
      ],
      expressions: [
        { type: "mcq", text: "What does it mean when a disagreement \"comes to a head\"?", options: ["It disappears completely", "It reaches a critical point where it must be addressed directly", "It becomes a joke", "It is resolved peacefully without discussion"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words what David meant when he said the disagreement 'was never really about real estate at all'.", answer: "He meant that the true source of the conflict was their shared grief and fear of losing their final connection to their mother, not a practical disagreement about property." }
      ]
    }
  },

  {
    id: "story-proyectos-c1",
    area: "proyectos",
    level: "C1",
    projectId: "core-project",
    title: "The Postmortem",
    subtitle: "Un equipo de ingeniería conduce un análisis retrospectivo sin culpas tras un incidente mayor en producción",
    text: `Rarely had the engineering team convened a meeting with quite as much collective apprehension as the one scheduled for the Monday following the outage — an incident that had rendered the platform entirely inaccessible to customers for just under four hours, during what happened to be the company's highest-traffic period of the quarter.

By the time the postmortem meeting began, most of the technical details had already been established: a routine configuration change, believed to be low-risk, had interacted unexpectedly with a legacy system component that few remaining engineers fully understood, triggering a cascading failure that automated monitoring had been slow to detect. What remained unresolved was not the technical narrative but something considerably more delicate: how, precisely, the postmortem itself ought to be conducted.

Elena, the engineering director, opened the meeting by stating, unambiguously, the principle she intended to enforce throughout the discussion. "This is a blameless postmortem," she said. "That doesn't mean mistakes weren't made, or that we won't examine them closely. It means we're here to understand systems and decisions, not to assign individual fault."

For Marcus, the engineer who had made the initial configuration change, this reassurance did little to fully dispel his unease. Regardless of the stated intention, he found it difficult not to feel, at least implicitly, that the meeting's central question — however diplomatically framed — remained some variation of what had gone wrong, and by extension, who had allowed it to.

As the discussion unfolded, however, it became evident that Elena's framing was not merely rhetorical. Rather than dwelling on Marcus's specific action, the conversation gravitated toward more systemic questions: why had a change of this nature been permitted without more rigorous review; why had the legacy component's fragility not been documented anywhere accessible; and why had monitoring taken as long as it had to surface an issue of this magnitude.

"I don't think the answer here is 'Marcus should have known,'" said Priya, a senior engineer who had worked on the legacy system years earlier. "I think the answer is that we, collectively, allowed critical knowledge to live in a handful of people's heads instead of in our documentation. That's a systemic failure, not a personal one."

Marcus, visibly relieved by the shift in framing, nonetheless offered his own account candidly, walking the team through his reasoning at the time and acknowledging, without excessive self-recrimination, where his assumptions had proven mistaken.

"I assumed the change was low-risk because similar changes had been low-risk before," he explained. "In hindsight, I should have flagged more uncertainty around that specific component, given how little I actually knew about it."

The meeting concluded not with assigned blame, but with a set of concrete action items: improved monitoring thresholds, mandatory documentation for legacy components deemed high-risk, and a revised review process for changes touching poorly understood parts of the system. Crucially, none of these actions singled out Marcus individually, a fact that several engineers later remarked had made them considerably more willing to speak candidly during the discussion than they might otherwise have been.

In the weeks that followed, Elena noticed a subtle but meaningful shift in how incidents were reported across the team. Engineers seemed markedly more willing to flag near-misses and minor issues proactively, rather than quietly resolving them and hoping they wouldn't recur. When she asked one engineer, informally, why this seemed to be the case, the response was telling.

"Because I actually believe you when you say it's blameless," the engineer said. "After watching what happened with Marcus, it doesn't feel like a performance anymore."

Elena considered this, months later, to be among the more significant outcomes of that difficult Monday morning meeting — not the specific technical fixes implemented, valuable as they were, but the gradual, hard-won trust that made future problems more likely to surface early, while they were still small enough to matter less.`,
    summaryEs: "Tras una caída mayor de la plataforma, la directora de ingeniería Elena conduce una retrospectiva sin culpas. Al enfocarse en fallas sistémicas en lugar de culpar a un individuo, el equipo gana confianza genuina, lo que mejora cómo se reportan los problemas en el futuro.",
    vocab: [
      { en: "postmortem", es: "análisis retrospectivo (post-incidente)", example: "The postmortem meeting began." },
      { en: "apprehension", es: "aprensión / inquietud", example: "As much collective apprehension as this meeting." },
      { en: "cascading failure", es: "falla en cascada", example: "Triggering a cascading failure." },
      { en: "blameless", es: "sin culpas", example: "This is a blameless postmortem." },
      { en: "unambiguously", es: "sin ambigüedad", example: "Elena stated unambiguously the principle." },
      { en: "implicitly", es: "implícitamente", example: "He found it difficult not to feel, at least implicitly." },
      { en: "systemic", es: "sistémico/a", example: "That's a systemic failure, not a personal one." },
      { en: "self-recrimination", es: "autorreproche", example: "Without excessive self-recrimination." },
      { en: "thresholds", es: "umbrales", example: "Improved monitoring thresholds." },
      { en: "proactively", es: "proactivamente", example: "Engineers seemed more willing to flag issues proactively." }
    ],
    grammarFocus: [
      {
        title: "Inversión formal con 'Rarely had...'",
        explanation: "Al iniciar una oración con un adverbio negativo como 'Rarely', se invierte el orden auxiliar-sujeto para dar énfasis formal.",
        pattern: "Rarely + had/did + subject + past participle/verb",
        examples: ["Rarely had the engineering team convened a meeting with quite as much apprehension.", "Rarely does a postmortem go exactly as planned."]
      },
      {
        title: "Cláusulas concesivas formales (however diplomatically framed, regardless of)",
        explanation: "Expresiones como 'however + adjetivo/adverbio' y 'regardless of' introducen una concesión sin usar 'although', típicas del registro C1.",
        pattern: "..., however + adj/adv + past participle, ...; regardless of + noun",
        examples: ["The central question, however diplomatically framed, remained about what had gone wrong.", "Regardless of the stated intention, he found it difficult not to feel implicated."]
      }
    ],
    evaluation: {
      comprehension: [
        { type: "mcq", text: "What caused the outage?", options: ["A cyberattack", "A routine configuration change interacting badly with a legacy system component", "A power outage at the office", "A scheduled maintenance that went wrong"], answer: 1 },
        { type: "mcq", text: "What principle did Elena establish for the postmortem?", options: ["To find and punish whoever was responsible", "That it would be a blameless postmortem focused on systems, not individual fault", "To keep the meeting as short as possible", "To only discuss the technical fix"], answer: 1 },
        { type: "mcq", text: "True or False: The meeting ended by formally blaming Marcus for the outage.", options: ["True", "False"], answer: 1 },
        { type: "mcq", text: "What did Priya argue was the real systemic failure?", options: ["Marcus not knowing enough", "Critical knowledge existing only in a few people's heads instead of documentation", "The monitoring software being too expensive", "Elena not attending enough meetings"], answer: 1 },
        { type: "order", text: "The outage occurs / Elena opens the meeting explaining the blameless approach / Priya reframes the issue as systemic / The team agrees on concrete action items", answer: "the outage occurs elena opens the meeting explaining the blameless approach priya reframes the issue as systemic the team agrees on concrete action items" }
      ],
      vocabulary: [
        { type: "fill-blank", text: "The failure was ___, not personal — it came from how the whole system and team operated.", answer: "systemic" },
        { type: "mcq", text: "What does \"blameless\" mean in this context?", options: ["Focused on punishing someone", "Focused on understanding causes without assigning individual fault", "Meaning nobody made any mistakes at all", "A meeting with no conclusions"], answer: 1 },
        { type: "short-answer", text: "Translate into English: \"El equipo estableció nuevos umbrales de monitoreo.\"", answer: "The team established new monitoring thresholds." }
      ],
      grammar: [
        { type: "mcq", text: "Which sentence correctly uses formal inversion with 'Rarely'?", options: ["Rarely had the team convened a meeting with such apprehension.", "Rarely the team had convened a meeting with such apprehension.", "The team rarely had convened a meeting with such apprehension."], answer: 0 },
        { type: "fill-blank", text: "___ the stated intention, he found it difficult not to feel implicated. (regardless)", answer: "Regardless of" },
        { type: "mcq", text: "Which sentence correctly uses a concessive clause with 'however'?", options: ["The question, however diplomatically framed, remained about what had gone wrong.", "The question however was diplomatically framed remained about what had gone wrong.", "However the question diplomatically framed remained about what had gone wrong."], answer: 0 }
      ],
      pronunciation: [
        { type: "pronunciation", text: "This is a blameless postmortem." },
        { type: "pronunciation", text: "It doesn't feel like a performance anymore." }
      ],
      expressions: [
        { type: "mcq", text: "What does \"hard-won\" mean in \"hard-won trust\"?", options: ["Trust that came easily", "Trust that was achieved only through significant effort or difficulty", "Trust that was purchased", "Trust that was accidental"], answer: 1 },
        { type: "short-answer", text: "Explain in your own words why engineers became more willing to report near-misses after this postmortem.", answer: "Because they saw that the blameless approach was genuine (demonstrated through how Marcus was treated), not just something said for appearances, which made them trust that honesty wouldn't be punished." }
      ]
    }
  }
];

export function storiesByArea(areaId) {
  return STORIES.filter(s => s.area === areaId);
}

export function storyById(id) {
  return STORIES.find(s => s.id === id);
}

export function allEvaluationQuestions(story) {
  const e = story.evaluation;
  return [
    ...e.comprehension.map(q => ({ ...q, dimension: "comprehension" })),
    ...e.vocabulary.map(q => ({ ...q, dimension: "vocabulary" })),
    ...e.grammar.map(q => ({ ...q, dimension: "grammar" })),
    ...e.pronunciation.map(q => ({ ...q, dimension: "pronunciation" })),
    ...e.expressions.map(q => ({ ...q, dimension: "expressions" }))
  ];
}
