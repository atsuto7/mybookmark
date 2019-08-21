$(function() {
    function appendTag(tag) {
      var html = `<div class="post-search-result-element" data-tag-id= "${tag.id}">
      <p class="tag-text">${tag.name}</p>
      <div class="tag-search-add url-tag__btn url-tag__btn--add" data-tag= "${tag}" data-tag-id="${tag.id}" data-tag-name="${tag.name}">追加</div>
      </div>`
    return html
     }
     function definedTag(name, id) {
      var html = `<div class='defined-search-result-element' id='chat-group-user-8' >
      <input name='url[tag_ids][]' type='hidden' value='${id}' >
      <p class='url-tag__name'>#${name}</p>
      <div class='tag-search-remove' data-tag-id="${id}" >削除</div>
    </div>`
    return html
    }
  $(document).on('turbolinks:load', function(){
    var tags_id = [];
    $(".post-research").on("keyup", function(){
      var input = $(".post-research").val();
      console.log(input)
      $.ajax({
        type: 'GET',
        url: '/tags/search',
        data: { keyword: input, tag_id: tags_id},
        dataType: 'json'
      })
    
    .done(function(tags) {
      $(".post-research__tag-search-result").empty();
      if (tags.length !== 0) {
        tags.forEach(function(tag){
          var html = appendTag(tag);
          $('.post-research__tag-search-result').append(html)
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
  $('.post-research__tag-search-result').on('click', '.url-tag__btn--add', function(){
    $(this).parent().remove();
    var name = $(this).attr('data-tag-name')
    var id = $(this).attr('data-tag-id')
    var html = definedTag(name, id);
    $('.defined-result').append(html)
    tags_id.push(id);
  });
  $('.defined-result').on('click', '.tag-search-remove', function(){
    console.log('ttt')
    $(this).parent().remove();
    var id = $(this).attr('data-tag-id')
    console.log(id)
    var idx = tags_id.indexOf(id);
    if(idx >= 0){
    tags_id.splice(idx, 1); 
    }
    console.log(tags_id)
    });
    $(".create-new-tag").on('click', function(){
      var input = $(".post-research").val();
      console.log(input)
      $.ajax({
        type: 'post',
        url: '/tags',
        data: { name: input },
        dataType: 'json',
        
      })
      .done(function(tag) {
        $(".post-research").val('');
        var id = tag.id
        var name = tag.name
        var id = id.toString();
        var html = definedTag(name, id);
        $('.defined-result').append(html)
        tags_id.push(id);
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    
  })
    
  })
});
