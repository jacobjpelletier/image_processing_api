import Resize from "../utilities/resize"

describe('test resize class', () => {

    // test class constructor
    const resizeTest = new Resize('src/images/mario.jpg', 100, 100);

    it('initial path assignment works', () => {
        expect(resizeTest.path).toEqual('src/images/mario.jpg')
    });
    it('initial width assignment works', () => {
        expect(resizeTest.width).toEqual(100)
    });
    it('initial height assignment works', () => {
        expect(resizeTest.height).toEqual(100)
    });
})