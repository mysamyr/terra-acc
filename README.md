TODO

- Add dev wings
- Add extended search (optional)
- Make normal acc adder
  - id - name in snake case ("") \*
  - name - name of acc ("") \*
  - path - relative path to img ("${id}.png") \*
  - used_in - array of ids, where item is used ([""])
  - recipes - array of objects, that includes ingredients (["" | ["", "${text}"]]) and array with stations [""]
  - type - A (accessory), S (station), I (ingredient) ("") \*
  - effect - description of effect, that acc gives ("")
  - obtain - if item can be obtained not from crafting ("")
  - category - array of categories ([""]) \*

If `obtain` presents - recipes is empty

"\*" - required field

If type = `S` or `I` - no need to provide `used_in`, `recipes`, `effect` and `obtain`

Category can be:

- Movement
- Informational
- Health and Mana
- Combat
- Construction
- Fishing
- Yoyos
- Miscellaneous
- Wings
- Expert mode exclusive
- Recovery potions
- Food and drink potions
- Buff potions
- Other potions
