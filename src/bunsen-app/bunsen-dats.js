import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-form/iron-form.js';
/**
 * @customElement
 * @polymer
 */
class BunsenDats extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: block;
      }
      a:link,
      a:visited,
      a:hover,
      a:focus,
      a:active {
        color: white;
        font-size: 1.5em;
      }
    </style>

    <table style="width: 100%">
      <template is="dom-repeat" items="{{items}}">
      <tr>
        <td style="width: 100%">
          <a href="{{item.address}}">{{item.address}}</a>
        </td>
      </tr>
      </template>
    </table>
`;
  }

  static get is() { return 'bunsen-dats'; }
  static get properties() {
    return {
      items: {
        type: Array,
        value: []
      }
    };
  }

  async connectedCallback() {
    super.connectedCallback()

  }
}

window.customElements.define(BunsenDats.is, BunsenDats);
