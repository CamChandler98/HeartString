import random
def gen_count_dict(Model):
    items = Model.query.all()

    count_obj = dict()

    for item in items:
        count_obj[str(item.id)] = {'id':item.id, 'count': 0}


    return count_obj

def assign_from_dict(count_dict, limit):
    key = random.choice(list(count_dict.keys()))
    current_count = count_dict[str(key)]['count']
    if current_count + 1 >= limit:
        del count_dict[str(key)]
    else:
        count_dict[str(key)]['count'] += 1


    return int(key)
