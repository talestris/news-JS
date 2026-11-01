import { Source } from '../../controller/controller';

import './sources.css';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

                const itemName = sourceClone.querySelector('.source__item-name');
                const itemContainer = sourceClone.querySelector('.source__item');

                if (itemName) {
                    itemName.textContent = item.name;
                }

                if (itemContainer) {
                    itemContainer.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            });
        }

        const sourcesContainer = document.querySelector('.sources');

        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
