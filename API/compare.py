slownikLiter = [
    'a', 'ą', 'b', 'c','ć', 'd', 'e', 'ę', 'f', 'g',
    'h', 'i', 'j', 'k', 'l','ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's',
    'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'
]
def cmp(w1, w2):
    lenw1 = len(w1)
    lenw2 = len(w2)
    ln = 0
    if lenw1 > lenw2: ln = lenw2
    else: ln = lenw1
    cm = 0
    for i in range(ln):
        cm = slownikLiter.index(w1[i]) - slownikLiter.index(w2[i])
        if cm != 0:
            break

    if cm != 0:
        return cm

    if lenw1 > lenw2:
        return 1
    elif lenw2 > lenw1:
        return -1

    return cm