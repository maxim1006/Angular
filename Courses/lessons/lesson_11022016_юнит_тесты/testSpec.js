describe("Some test", function() {

    beforeEach(module('app'));

    it("Should pass tests", function() {
       var a = 1;

        expect(a).toBe(1);
    });



    describe("service", function() {
        it("should check type of factory", inject(function(factoryCustom) {
            var type = typeof factoryCustom.prop;

            expect(type).toBe("string");
        }));
    });



    describe("controller", function() {

        var controllerCustom, factoryCustom;

        beforeEach(inject(function($controller, _factoryCustom_) {
            factoryCustom = _factoryCustom_;
            spyOn(factoryCustom, 'get').and.returnValue(1); //тут привязываю шпион на метод, который находится в фабрике и вызывается в контроллере; Шпион нужен для слежки внутри метода
            controllerCustom = $controller('controllerCustom', {factoryCustom: factoryCustom}); //так получаю контроллер и прописываю то что инжектиться
        }));

        it("should call get method", function() {
            expect(factoryCustom.get).toHaveBeenCalled();//так вызываю этот метод на котором spy; toHaveBeenCalled - проверка на то, что метод вызывается
            expect(controllerCustom.prop).toBe(2);
        });

        it("should be result prop", function() {
            expect(controllerCustom.prop).toBe(2);
        });
    });



    describe("service with $http", function() {
        var factoryGet,
            $httpBackend,
            mockUsers = [{name: "Max"}, {name: "Aliya"}];

        beforeEach(inject(function(_factoryGet_, _$httpBackend_) {
            factoryGet = _factoryGet_;
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('users.json').respond(mockUsers);
            $httpBackend.whenGET('user.json').respond(mockUsers[0]);
        }));

        it("should get one user", function(done) {
            factoryGet.getOne().then(function(user) {
                expect(user.name).toBe(mockUsers[0].name);
                done();
            });

            $httpBackend.flush();
        });

        it("should get all user", function(done) {
            factoryGet.get().then(function(users) {
                expect(users.length).toBeGreaterThan(0);
                done();
            });

            $httpBackend.flush(); //нужно чтобы избежать ошибки Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
        });
    });





});