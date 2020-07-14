require "json"

package = JSON.parse(File.read(File.join(__dir__, "..", "package.json")))

Pod::Spec.new do |s|
  s.name         = "Alipay"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                    Alipay SDK for React Native
                   DESC
  s.homepage     = "https://github.com/uiwjs/react-native-alipay"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Kenny Wong" => "wowohoo@qq.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/uiwjs/react-native-alipay.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "AlipaySDK-iOS"
  s.library = "c++", "z"
  # ...
  # s.dependency "..."
end

