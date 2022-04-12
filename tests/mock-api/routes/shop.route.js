import express from 'express'
import faker from 'faker'
const router = express.Router()

// 상품 목록 조회
router.get('/items', (req, res) => {
  try {
    const items = req.db.get('items').value()
    if (!items || !Array.isArray(items)) throw new Error('자원이 없음, DB 오류')
    if (items.length < 1)
      return res.status(204).json({
        message: 'No Content',
      })
    const result = items.map((v) => ({
      id: v.id,
      title: v.title,
      thumbnail: faker.image.fashion(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
    }))
    res.status(200).json({
      code: 2000,
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
})

router.post('/items', (req, res) => {
  try {
    const { title } = req.body
    if (!title || title === '') {
      return res.status(400).json({
        message: '잘못된 요청',
      })
    }
    const items = req.db.get('items').value()
    const createObj = {
      id: items.length == 0 ? 1 : items.length + 1,
      title,
    }
    req.db.get('items').push(createObj).write()
    res.status(200).json({
      code: 2000,
      message: 'success',
      data: createObj,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'fail add item',
    })
  }
})

// // 상품 상세 조회
router.get('/item/:id', (req, res) => {
  try {
    const { id } = req.params
    const findItem = req.db.get('items').find({ id: id }).value()
    if (!findItem) {
      return res.status(204).json({
        message: 'No Content',
      })
    }
    res.status(200).json({
      code: 2000,
      message: 'No Content',
      data: findItem,
    })
  } catch (err) {
    console.log(err)
  }
})

export default router
