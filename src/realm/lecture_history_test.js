import {delete_lecture_history, get_all_lecture_histories, save_lecture_history} from "./lecture_history";

export function lecture_history_test() {
  // save_lecture_history({
  //   id: '1234567890',
  //   title: '我是标题1'
  // })
  //
  // save_lecture_history({
  //   id: '1234567891',
  //   title: '我是标题2'
  // })
  //
  // save_lecture_history({
  //   id: '1234567892',
  //   title: '我是标题3'
  // })

  // delete_lecture_history('1234567890')

  const all_lecture_histories = get_all_lecture_histories()
  console.log(all_lecture_histories)
}