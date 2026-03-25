const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { MOLONGSKI_SYSTEM_PROMPT } = require('../prompts/molongski');

const client = new Anthropic();

router.post('/', async (req, res) => {
  try {
    const { jobPost } = req.body;

    if (!jobPost || !jobPost.trim()) {
      return res.status(400).json({ success: false, error: 'Job post is required.' });
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: MOLONGSKI_SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: jobPost }
      ]
    });

    let responseText = message.content[0].text;

    // Strip markdown fences if present
    responseText = responseText.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '');
    responseText = responseText.trim();

    const parsed = JSON.parse(responseText);
    return res.json({ success: true, data: parsed });
  } catch (err) {
    console.error('Analyze error:', err.message);
    return res.json({ success: false, error: err.message || 'Analysis failed.' });
  }
});

module.exports = router;
