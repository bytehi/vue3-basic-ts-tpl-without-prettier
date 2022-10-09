const userList = [
  { date: '2016-05-03', name: 'Tom' },
  { date: '2016-05-02', name: 'Tom' },
  { date: '2016-05-04', name: 'Tom' },
  { date: '2016-05-01', name: 'Tom' },
  { date: '2016-05-20', name: 'Tom' },
]

export default [
  {
    url: '/mock/user/list',
    method: 'get',
    response: () => {
      return {
        code: 1,
        success: true,
        message: '',
        data: {
          total: 400,
          pageData: userList,
        },
      }
    },
  },
]
