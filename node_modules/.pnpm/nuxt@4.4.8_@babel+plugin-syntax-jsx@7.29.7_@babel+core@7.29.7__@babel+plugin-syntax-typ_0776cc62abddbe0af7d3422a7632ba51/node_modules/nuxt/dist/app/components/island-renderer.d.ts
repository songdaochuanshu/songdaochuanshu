import type { DefineSetupFnComponent } from 'vue';
interface IslandRendererProps {
    context: {
        name: string;
        props?: Record<string, any>;
    };
}
declare const IslandRenderer: DefineSetupFnComponent<IslandRendererProps>;
export default IslandRenderer;
