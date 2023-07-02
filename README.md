TODO
- Make categories
- Add wings, expert exclusive

  - id - ID (name in snake case)
  - name - name of acc
  - path - relative path to img ({id}.png)
  - used_in - array of ids, where item is used ([{id}])
  - recipes - array of objects, that includes array with ingredients and station (id of station)
  - type - A (accessory), S (station), I (ingredient)
  - effect - description of effect, that acc gives
  - obtain - if item can be obtained not from crafting

If `obtain` presents - recipes is empty

If type = `S` or `I` - no need to provide `used_in`, `recipes`, `effect` and `obtain`

Category can be:
- Movement
- Informational
- Health and Mana
- Combat
- Construction
- Fishing
- Yoyos
- Misc