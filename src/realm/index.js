import Realm from 'realm'
import realm from './init'

/**
 * 保存到某个 schema 中
 * @param schema
 * @param object
 * @param mode
 */
export function save(schema, object, mode = Realm.UpdateMode.Modified) {
  realm.write(() => {
    try {
      realm.create(schema, object, mode);
      console.log(`[SUCCESS] schema=${schema}: object=${object} saved.`)
    } catch (e) {
      console.log(`[FAILURE] schema=${schema}: object=${object} save failed.`)
    }
  });
}

/**
 * 根据某列 col 的 value 删除某个 schema 中的某个数据
 * @param schema
 * @param col
 * @param value
 */
export function remove(schema, col, value) {
  const filter_str = `${col} = "${value}"`;
  let to_remove = realm.objects(schema).filtered(filter_str)
  realm.write(() => {
    try {
      realm.delete(to_remove)
      console.log(`[SUCCESS] schema=${schema}: ${col}=${value} deleted.`)
    } catch (e) {
      console.log(`[FAILURE] schema=${schema}: ${col}=${value} deleted failed.`)
    }
  });
}

/**
 * 删除某个 schema 的全部数据
 * @param schema
 * @private
 * @danger 全删跑路，仅限此文件内部测试使用
 */
function __remove_all(schema) {
  realm.write(() => {
    try {
      realm.deleteAll()
      console.log(`[SUCCESS] schema=${schema} delete all.`)
    } catch (e) {
      console.log(`[FAILURE] schema=${schema} deleted all failed.`)
    }
  });
}

/**
 * 读取某个 schema 中的全部数据，可以对某列 col 按照升降序排序
 * @param schema
 * @param sort_col
 * @param descending
 * @return {Realm.Results<any>}
 */
export function get_all(schema, sort_col = undefined, descending = false) {
  let all_results;

  if (sort_col) {
    all_results = realm.objects(schema).sorted(sort_col, descending);
    console.log(`[SUCCESS] schema=${schema} get all, and sorted by ${sort_col}, descending=${descending}.`)
  } else {
    all_results = realm.objects(schema);
    console.log(`[SUCCESS] schema=${schema} get all.`)
  }
  return __trans_dict_to_array(all_results)
}

/**
 * 在某个 schema 中对某列 col 进行模糊搜索
 * @param schema
 * @param col
 * @param pattern
 * @return {Realm.Results<any>}
 */
export function filter_by_pattern(schema, col, pattern) {
  const filter_str = `${col} LIKE "${pattern}"`;
  let filtered_results = realm.objects(schema).filtered(filter_str)
  console.log(`[SUCCESS] schema=${schema} filter by pattern.`)
  return filtered_results
}

/**
 * 将 dict 中的 value 全部返回
 * @param dict
 * @return {Array}
 */
function __trans_dict_to_array(dict) {
  let keys = Object.keys(dict)

  let result = [];
  for (let i = 0; i < keys.length; i++) {
    result.push(dict[keys[i]])
  }

  return result
}