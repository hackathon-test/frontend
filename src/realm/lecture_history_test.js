import {get_all_lecture_histories, save_lecture_history} from "./lecture_history";

export function lecture_history_test() {
  // store_basic_data()

  const all_lecture_histories = get_all_lecture_histories()
  console.log(all_lecture_histories.length)
}

function store_basic_data() {
  save_lecture_history({
    id: gen_uuid(),
    title: '启蒙运动时期欧洲对美洲"他者"形象的构建',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '美国早期国家构建中的"中立化国家"概念',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '特朗普执政和美国对华政策变化的动因',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '行政管理研究的技术基础',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '从海洋情怀到诗画对读————以余光中海洋诗和《余光中诗画集》为核心的跨域诠释',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '特朗普执政和美国对华政策变化的动因',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: 'The Rose of the Hollywood Franchise 好莱坞系列电影的兴起',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '特朗普执政和美国对华政策变化的动因',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '南京回眸 旧影情怀————上海图书馆近代文献数字资源介绍',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '飞行皇帝————中古时期佛教对君主管的影响',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '翻译研究新思路：翻译档案研究',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '16世纪英国的革命与稳定',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '从宇宙进化到社会进步：近代中日交互语境中的斯宾塞',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '从大众文化在线论医疗人文研究',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '科研文献管理好帮手————NoteExpress'
    , speaker: '陈振宇', expireDate: '2019-05-29T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '学位论文网络资源的检索与搜索',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '舌尖上的记忆：亚裔美国女性饮食回忆录',
    speaker: '陈振宇', expireDate: '2019-05-28T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '旧时月色和梅边消息',
    speaker: '陈振宇', expireDate: '2019-06-01T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '关于一种"中等"文学：兼论法国当代文学',
    speaker: '陈振宇', expireDate: '2019-05-31T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '国家治理现代化进程中的法治与德治思考',
    speaker: '陈振宇', expireDate: '2019-05-30T11:25'
  })

  save_lecture_history({
    id: gen_uuid(),
    title: '贡斯当与法国近代自由主义的起源',
    speaker: '陈振宇', expireDate: '2019-05-29T11:25'
  })
}

function gen_uuid() {
  let d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}