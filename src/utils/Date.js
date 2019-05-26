import moment from 'moment';

export const getDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export const formatTime = (time) => {
    return moment(time).format('YYYY-MM-DD hh:mm');
}