$(function() {
  function appendTag(tag) {
    var html = `<div class="sarch-result-element" data-tag-id= "${tag.id}">
    <p class="tag-text">#${tag.name}</p>
    </div>`
  return html
   }
   function allTags() {
    var html = `<div class="sarch-result-element" data-tag-id= '~'>
    <p class="tag-text">全てのページ</p>
    </div>`
  return html
   }
   var destroy_redirect = function() {
    console.log('test');
    var path = location.pathname
    if (path.includes("/urls/index")) { 
    location.href = path
     }
     else {
      location.href = '/'
   }
  };
$(document).on('turbolinks:load', function(){
$(".search-tag").on("keyup", function() {
  var input = $(".search-tag").val();
  $.ajax({
    type: 'GET',
    url: '/tags/search',
    data: { keyword: input },
    dataType: 'json'
  })

.done(function(tags) {
  $("#sarch-tag-result").empty();
  var html = allTags();
  $('#sarch-tag-result').append(html)
  if (tags.length !== 0) {
    tags.forEach(function(tag){
      var html = appendTag(tag);
      $('#sarch-tag-result').append(html)
    }); 
  }
})
.fail(function() {
  alert('タグ検索に失敗しました');
})
})
$('#sarch-tag-result').on('click', '.sarch-result-element', function(){
  console.log('tttt');
  $(this).parent().remove();
  var id = $(this).attr('data-tag-id')
  if (id == '~') { 
  location.href = '/'
   }
   else {
    location.href = '/urls/index/' + id
   }
});
$(document).click(function(event) {
  if(!$(event.target).closest('.right-header__form').length) {
    $('.sarch-result-element').remove();
    $(".search-tag").val('');
  } else {
    console.log('内側がクリックされました。');
  }
});
$('.destroy').on('click', function(){
  if(!confirm('本当に削除しますか？')){
    /* キャンセルの時の処理 */
    return false;
}else{
    /*OKの時の処理 */
    setTimeout(destroy_redirect, 100);
}
});
})
});
