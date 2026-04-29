# Reflection — Persona-Based AI Chatbot

## What Worked

The most effective technique in this assignment was **grounding the persona in specificity rather than description**. Early drafts of the system prompts said things like "you are direct and data-driven." This produced generic outputs. The breakthrough came when I replaced descriptors with concrete behaviors: "you back every claim with a number or a story," "you always ask a follow-up question," "you never give advice without connecting it to a real example from Scaler's journey."

The few-shot examples were the single highest-leverage investment. Once I wrote three strong example exchanges per persona — exchanges that actually sounded like the person, not a helpful chatbot — the model's baseline behavior shifted dramatically. The examples set a tone that the instruction text alone could not. They showed rather than told.

Chain-of-thought instructions also made a measurable difference. Adding "internally reason through: what is this person actually asking beneath the surface?" before the response instruction reduced the rate of surface-level answers. The model started addressing the real question, not just the stated question.

## What the GIGO Principle Taught Me

GIGO — Garbage In, Garbage Out — was viscerally real in this assignment. My first version of Anshuman Singh's system prompt was four sentences: name, company, background, "be helpful and direct." The output was indistinguishable from a generic AI assistant who happened to mention Scaler every other sentence.

The principle taught me that **the model is not generating a persona from scratch** — it is executing instructions. If your instructions are vague, the model fills in the gaps with the average of everything it has seen, which is generic. The more specific and behavioral your instructions, the less room there is for generic defaults to creep in.

The most concrete GIGO lesson: the constraint section mattered as much as the instruction section. Telling the model what NOT to do (no motivational quotes, no vague advice, no "great question!") prevented the specific failure modes that made early outputs feel hollow.

## What I Would Improve

**More research:** The weakest part of my prompts is the few-shot examples — specifically, I had to infer tone from public content rather than direct transcripts of how each person speaks in casual conversation. With access to class recordings, WhatsApp messages, or internal talks, I could have written examples that were far more authentic.

**Dynamic context injection:** Right now the system prompt is static. In a real product, I would inject context dynamically — for example, if the user mentions they are a fresher from IIT Bombay, the persona's responses should reflect that specific context. This would require maintaining a user-profile object and prepending relevant context to each API call.

**Evaluation loop:** I wrote prompts, tested them, and revised manually. A proper improvement loop would involve defining evaluation criteria (does the response sound like the real person? does it end with a question? is it free of generic advice?) and scoring responses systematically before finalizing the prompt.

**Retrieval augmentation:** The biggest limitation is that the personas can only reference what was in the training data. Real-time retrieval of Scaler blog posts, LinkedIn updates, or recent interviews would allow the personas to speak about current events in their own voice — which would dramatically increase authenticity.