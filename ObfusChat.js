obfusChat = (function () {
    var vm = this;
    vm.origRotArray = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", ";", "'", "[", "]", "\\", "=", "-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{", "}", "|", ":", "\"", "<", ">", "?", "`", "~", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", " "];
    vm.rotArray = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", ";", "'", "[", "]", "\\", "=", "-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{", "}", "|", ":", "\"", "<", ">", "?", "`", "~", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", " "];
    vm.seed = 1;

    vm.rng = function (min, max) {
        var x = Math.sin(vm.seed++) * 10000;
        var rand = x - Math.floor(x);

        return Math.floor((rand * max) + min)
    }

    vm.randomizeArray = function (input) {
        var output = [];
        var arr = input.slice();
        for (var i = arr.length; i > 0; i--) {
            var remIndex = rng(0, i);
            var removed = arr.splice(remIndex, 1);
            output.push(removed[0]);
        }

        return output;
    };

    vm.setSeed = function (input) {
        vm.seed = input;
        vm.rotArray = randomizeArray(vm.origRotArray);
    }

    vm.rotate = function (char, arr) {
        var full = arr.length;
        var mid = full / 2;
        var curIndex = arr.indexOf(char);
        var newIndex = 0;
        if (curIndex + mid >= full) {
            newIndex = ((curIndex + mid) - full);
        } else {
            newIndex = curIndex + mid;
        }
        return arr[newIndex];
    }

    vm.obfuscate = function (text, seed) {
        if (typeof seed !== "undefined") {
            setSeed(seed);
        }
        var output = "";
        for (var i = 0; i < text.length; i++) {
            output += rotate(text[i], vm.rotArray);
            vm.rotArray = randomizeArray(vm.rotArray);
        }
        return output;
    }

    vm.deobfuscate = obfuscate;

    return {
        obfuscate: obfuscate,
        deobfuscate: deobfuscate,
    };
})();