TODO
- Add wings, expert exclusive
- Add possibility to set number of ingredients or complex stations on adding new accessories
- Last work - add recipes for golden/platinum clock
- make order with styles (move all to .css)

  - id - name in snake case ("") *
  - name - name of acc ("") *
  - path - relative path to img ("${id}.png") *
  - used_in - array of ids, where item is used ([""])
  - recipes - array of objects, that includes ingredients (["" | {name: string, number: number}]) and array with stations [""]
  - type - A (accessory), S (station), I (ingredient) ("") *
  - effect - description of effect, that acc gives ("")
  - obtain - if item can be obtained not from crafting ("")
  - category - array of categories ([""]) *

If `obtain` presents - recipes is empty

"*" - required field

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
- Wings (in progress)