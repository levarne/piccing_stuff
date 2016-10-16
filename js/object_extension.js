$(function() {
    var $object_extension = $('#object_extension');
    var $original_string = $object_extension.children('.original_string').text();
    var $random_string = $object_extension.children('.random_string');
    
    String.prototype.Reverse = function() {
        var charset = '';
        console.log(charset, this.length);
        for(var i = this.length - 1; i >= 0; i--) {
            charset += this[i];
        }
        
        return charset;
    }
    
    $random_string.text($original_string.Reverse());
});