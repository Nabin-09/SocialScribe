// Generate new post - FINAL WORKING VERSION
app.post('/api/generate', async (req, res) => {
  try {
    console.log('📝 Generate request:', req.body);
    
    const { platform, tone, topic, constraints } = req.body;

    if (!platform || !tone || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      });
    }

    // ✅ CORRECT MODEL NAMES FOR OCTOBER 2025
    console.log('🤖 Calling Gemini API...');
    
    // Try these model names in order
    const modelNames = [
      'gemini-2.5-flash',      // Latest October 2025
      'gemini-flash-latest',   // Alternative working name
      'gemini-2.5-pro',        // More powerful option
      'models/gemini-2.5-flash' // Full path format
    ];
    
    let model;
    let usedModel = null;
    
    for (const modelName of modelNames) {
      try {
        console.log(`⏳ Trying model: ${modelName}`);
        model = genAI.getGenerativeModel({ model: modelName });
        
        // Test the model with a simple prompt
        const testPrompt = "Generate a single word: Hello";
        await model.generateContent(testPrompt);
        
        usedModel = modelName;
        console.log(`✅ Successfully using model: ${modelName}`);
        break;
      } catch (err) {
        console.log(`❌ Model ${modelName} failed:`, err.message);
        continue;
      }
    }

    if (!model || !usedModel) {
      throw new Error('No available Gemini model found. Please check your API key.');
    }

    const prompt = `You are a professional social media content creator. Generate a ${tone.toLowerCase()} social media post for ${platform} about the following topic:

Topic: ${topic}
${constraints ? `Additional requirements: ${constraints}` : ''}

Guidelines:
- For Twitter: Keep under 280 characters
- For LinkedIn: Professional tone, can be longer (up to 3000 chars)
- For Instagram: Engaging, visual, under 2200 characters
- For Facebook: Conversational, under 63206 characters

Write ONLY the post content. Do not include any explanations, quotes, or introductory text.`;

    console.log('⏳ Generating content...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    console.log(`✅ Generated ${generatedText.length} characters using ${usedModel}`);

    const newPost = await Post.create({
      platform,
      tone,
      topic,
      constraints: constraints || '',
      generatedText,
      finalText: generatedText,
    });

    console.log('✅ Post saved:', newPost._id);

    res.status(201).json({
      success: true,
      post: newPost,
      modelUsed: usedModel // For debugging
    });

  } catch (error) {
    console.error('❌ Generation error:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate post',
      error: error.message,
      hint: 'Check your API key at https://aistudio.google.com/app/apikey'
    });
  }
});
