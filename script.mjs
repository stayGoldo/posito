// scripts/test-login.mjs
async function testLogin() {
  // 1. 配置你要测试的登录接口和账户信息
  const url = 'http://localhost:3000/api/auth/login'; // 👈 请替换为你的真实登录接口
  const bodyData = {
    username: 'your_username_here', // 👈 替换为测试用户名
    password: 'your_password_here'  // 👈 替换为测试密码
  };

  console.log(`📤 正在向 ${url} 发送登录请求...`);

  try {
    // 2. 发送POST请求
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData)
    });

    // 3. 打印关键响应信息
    console.log(`📥 响应状态码: ${response.status} (${response.statusText})`);

    // 4. 提取并打印Cookie（核心目标）
    const cookies = response.headers.get('set-cookie');
    console.log('🍪 响应Cookie:');
    console.log(cookies ? cookies.split(', ') : '无');

    // 5. 可选：打印响应体（用于查看登录成功后的Token或消息）
    const responseBody = await response.text();
    console.log('📄 响应体:', responseBody.substring(0, 200)); // 限制长度

  } catch (error) {
    console.error('❌ 请求失败:', error.message);
    console.log('💡 请确保：1. 服务器正在运行 (pnpm dev) 2. 接口地址正确');
  }
}

// 运行函数
testLogin();