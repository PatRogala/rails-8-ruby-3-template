# Extend allowed tags/attributes for Tiptap HTML rendering
Rails.application.config.after_initialize do
  allowed_tags = %w[p br h2 h3 h4 strong em a ul ol li blockquote img code pre hr span]
  allowed_attrs = %w[href src alt title target rel class data-mention data-type]
  loofah = Rails::Html::SafeListSanitizer.safe_list_sanitizer
  if loofah.respond_to?(:allowed_tags)
    loofah.allowed_tags.merge(allowed_tags)
    loofah.allowed_attributes.merge(allowed_attrs)
  end
end
