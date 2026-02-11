
import translate from 'google-translate-api-next';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const res = await translate(body.text, { to: body.target });
    return { text: res.text };
  } catch (e) {
    return { text: "Fehler bei der Übersetzung" };
  }
});