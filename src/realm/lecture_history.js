/*
 * 历史记录的本地化存储管理
 */
import {get_all, remove, save} from "./index";

const SCHEMA_LECTURE_HISTORY = 'LectureHistory';

/**
 * 保存单个历史记录
 * @param lecture_history 要保存的单个历史记录
 */
export function save_lecture_history(lecture_history) {
  save(SCHEMA_LECTURE_HISTORY, lecture_history)
}

/**
 * 删除单个标签
 * @private
 * @param lecture_history_id
 */
export function delete_lecture_history(lecture_history_id) {
  remove(SCHEMA_LECTURE_HISTORY, 'id', lecture_history_id)
}

/**
 * 获得所有的标签，返回的是 lecture_history 对象的数组
 * @return {Array}
 */
export function get_all_lecture_histories() {
  return get_all(SCHEMA_LECTURE_HISTORY)
}