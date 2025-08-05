// src/api/deepseek.ts
export async function sendMessageToDeepSeek(messages: { role: string; content: string }[]) {
  const apiKey = 'sk-b2619f916a084d22be7f9421be2646fe'; // ✅ 请替换成你的真实 key

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      stream: false // 如果你想用 stream 模式，设为 true 并换成流式处理方式
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from DeepSeek');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
