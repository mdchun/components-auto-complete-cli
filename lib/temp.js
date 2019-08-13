{{#each comps}}
import {{this}} from './{{this}}'
{{/each}}

export default {
  {{#each comps}}
    {{this}},
  {{/each}}
}
