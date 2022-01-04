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

    // note that calledFunc = stream rather than object, so need to check that via options rather than an object in the server
    let calledFunc = resizeTest.resize('src/images/mario.jpg', 200, 200)

    it('new width assignment via resize function', () => {
        expect(calledFunc.options.width).toEqual(200);
    });
    it('new height assignment via resize function', () => {
        expect(calledFunc.options.height).toEqual(200);
    });
})