$(document).ready(function() {
  $(document).on('change', "input[name='is_completed']", function() {
    var id = $(this).attr('id');
    var is_completed;

    if ($(this).is(':checked')) {
      is_completed = 1;
    } else {
      is_completed = 0;
    }

    $.ajax({
      type: 'POST',
      url: '/todos/complete/' + id,
      data: {
        is_completed: is_completed
      },
      success: function(response) {
        alert('Todo status changed!');
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('#search-btn').on('click', function() {
    var searchValue = $('#todo-search')
      .val()
      .trim();

    $.ajax({
      type: 'POST',
      url: '/todos/filter',
      data: {
        search: searchValue
      },
      success: function(response) {
        $('#todo-list').fadeOut();
        $('#search-result').empty();

        if (response.length > 0) {
          $.each(response, function(i, todo) {
            $('#search-result').append(
              '<li class="list-group-item d-flex justify-content-between align-items-center"><a href="/todos/edit/' +
                todo.todo_id +
                '">' +
                todo.todo_title +
                '</a><div class="form-group"><label class="form-check-label">Completed!<input type="checkbox" class="form-check-input" id="' +
                todo.todo_id +
                '" name="is_completed" ' +
                (todo.is_completed == 1 ? 'checked' : '') +
                '><span class="checkmark"></span></label></div></li>'
            );
          });

          $('#todo-search').val('');
        } else {
          $('#search-result').html(
            '<li class="list-group-item">No search result for' +
              searchValue +
              '</li>'
          );
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
