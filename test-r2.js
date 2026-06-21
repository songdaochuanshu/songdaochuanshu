// 测试 R2 连接
const accountId = 'd6397095e8c56098875c9b44f03fa970'
const bucketName = 'songdaochuanshu-static'
const token = 'cfat_M2G7nglcQK6o7AZUTS16CHxbbSJAHbgKRL0gJhi7d94e7602'

async function testR2() {
  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('R2 连接成功！')
    console.log('对象数量:', data.result?.length || 0)
    console.log('对象列表:', JSON.stringify(data.result, null, 2))
  } catch (error) {
    console.error('R2 连接失败:', error)
  }
}

testR2()
