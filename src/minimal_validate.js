// テキストフィールドの検証
//======================================

// テキストフィールドの未入力を検証
function textRequired(element) {
    if ($(element).val()) {
        if (!$(element).hasClass('is-invalid')) {
            $(element).addClass('is-valid');
            $(element).nextAll('.invalid-feedback').remove();
        }
    } else {
        $(element).removeClass('is-valid');
        $(element).addClass('is-invalid');
        $(element).parent().append(`<div class="invalid-feedback">未入力です。</div>`);
    }
}

// 半角入力のみ
function textAlphanumeric(element) {
    var input_text = $(element).val();
    if (input_text) {
        if (input_text.match(/[0-9a-zA-Z,.-_]/)) {
            if (!$(element).hasClass('is-invalid')) {
                $(element).addClass('is-valid');
                $(element).nextAll('.invalid-feedback').remove();
            }
        } else {
            $(element).removeClass('is-valid');
            $(element).addClass('is-invalid');
            $(element).parent().append(`<div class="invalid-feedback">半角英数と記号(,.-_)のみ入力できます。</div>`);
        }
    }
}

// 番号のみ
function textNumber(element) {
    var input_text = $(element).val();
    if (input_text) {
        if (input_text.match(/[0-9.,-]/)) {
            if (!$(element).hasClass('is-invalid')) {
                $(element).addClass('is-valid');
                $(element).nextAll('.invalid-feedback').remove();
            }
        } else {
            $(element).removeClass('is-valid');
            $(element).addClass('is-invalid');
            $(element).parent().append(`<div class="invalid-feedback">数字のみ入力できます。</div>`);
        }
    }
}

// 選択フィールドの検証
//======================================

// 選択フィールドが未選択
function selectRequired(element) {
    if ($(element).val()) {
        if (!$(element).hasClass('is-invalid')) {
            $(element).addClass('is-valid');
            $(element).nextAll('.invalid-feedback').remove();
        }
    } else {
        $(element).removeClass('is-valid');
        $(element).addClass('is-invalid');
        $(element).parent().append(`<div class="invalid-feedback">未選択です。</div>`);
    }
}


//======================================
// Validationイベントを設定
//======================================
function checkingFields(event) {
    event.preventDefault();

    // エラー文を削除
    $(this).find('.is-valid').removeClass('is-valid');
    $(this).find('.is-invalid').removeClass('is-invalid');
    $(this).find('.invalid-feedback').remove();

    // テキストフィールドが未入力
    $(this).find('.v-text-required').each(function(index, element) {
        textRequired(element);
    });

    // 半角のみ
    $(this).find('.v-text-alphanumeric').each(function(index, element) {
        textAlphanumeric(element);
    });

    // 番号のみ
    $(this).find('.v-text-number').each(function(index, element) {
        textNumber(element);
    });

    // 選択フィールドが未選択
    $(this).find('.v-select-required').each(function(index, element) {
        selectRequired(element);
    });

    // エラー数をカウント
    if ($(this).find('.is-invalid').length) {
        console.log(`Error: ${$(this).find('.is-invalid').length}`);
        return false;
    }

    $(this).off('submit', checkingFields);
    $(this).submit();
}


//======================================
// Validationイベントを設定
//======================================
$(function() {

    // テキストフィールドが未選択
    $('.v-text-required').change(function() {
        textRequired($(this));
    });

    // 半角のみ
    $('.v-text-alphanumeric').change(function() {
        textAlphanumeric($(this));
    });

    // 番号のみ
    $('.v-text-number').change(function() {
        textNumber($(this));
    });

    // 選択フィールドが未選択
    $('.v-select-required').change(function() {
        selectRequired($(this));
    });

    // フォームの送信が発生した場合
    $('.v-form').on('submit', checkingFields);
});