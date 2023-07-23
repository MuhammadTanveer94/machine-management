import {AttributeEnum} from '../../types';

const MenuContacts = (() => {
  const types = [
    {name: 'Text', value: AttributeEnum.TEXT},
    {name: 'Date', value: AttributeEnum.DATE},
    {name: 'Checkbox', value: AttributeEnum.CHECKBOX},
    {name: 'Number', value: AttributeEnum.NUMBER},
  ];
  return {
    types,
  };
})();

export default MenuContacts;
