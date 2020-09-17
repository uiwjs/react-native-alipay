require "json"

package = JSON.parse(File.read(File.join(__dir__, '..', "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNAlipay"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                      Alipay SDK for React Native
                   DESC
  s.homepage     = package['repository']['url']
  # brief license entry:
  s.license      = package["license"]
  s.author       = { package["author"]["name"] => package["author"]["email"] }
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/uiwjs/react-native-alipay.git", :tag => "#{s.version}" }

  s.source_files = "**/*.{h,c,m,swift}"
  # s.source_files = "**/*.{h,m}"
  s.requires_arc = true

  s.frameworks = "UIKit",
  s.frameworks = "Foundation",
  s.frameworks = "CFNetwork",
  s.frameworks = "SystemConfiguration",
  s.frameworks = "QuartzCore",
  s.frameworks = "CoreGraphics",
  s.frameworks = "CoreMotion",
  s.frameworks = "CoreTelephony",
  s.frameworks = "CoreText",
  s.frameworks = "WebKit"

  s.dependency "React"
  s.resource = 'AlipaySDK.bundle'
  # s.source_files  = "AlipaySDKiOS/AlipaySDK.framework/**/*"
  s.vendored_frameworks = 'AlipaySDK.framework'
  s.library = "c++", "z"
  # ...
  # s.dependency "..."
end

