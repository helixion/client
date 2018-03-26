import Errors from './Errors';

export default function(status) {
    return {
        render(h) {
            return h(Errors, { props: { status } });
        }
    }
}