export function getSeconds(str) {
    let part1 = 0;
    let part2 = 0;
    let flag = true;
    let isHour = false;

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            if (flag) {
                part1 = part1 * 10 + (str[i] - '0');
            }
            else {
                part2 = part2 * 10 + (str[i] - '0');
            }
        }
        else {
            flag = false;
        }

        if (str[i] === 'h' || str[i] === 'H') isHour = true;
    }

    if (!isHour) {
        return part1 * 60;
    }

    return part1 * 3600 + part2 * 60;
}

export function getTime(seconds) {
    if (seconds === 0) return '0min';

    let hr = Math.trunc(seconds / 3600);
    seconds -= (hr * 3600);
    let mn = Math.trunc(seconds / 60);
    let time = (hr ? `${hr}hr` : '') + (mn ? `${mn}min` : '');
    return time;
}