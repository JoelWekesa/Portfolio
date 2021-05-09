import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import LinearProgress from "@material-ui/core/LinearProgress";

export class Home extends Component {
	state = {
		images: [],
		show: false,
		error: null,
		name: "",
		email: "",
		subject: "",
		message: "",
		loading: false,
		missing: false,
	};
	componentDidMount = () => {
		const url = "http://127.0.0.1:8000/api/images/";
		axios.get(url).then((res) => {
			this.setState({
				...this.state,
				images: res.data,
			});
		});
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			...this.state,
			loading: true,
		});
		const { name, email, subject, message, loading, error } = this.state;
		const body = { name, email, subject, message };
		const url = "http://127.0.0.1:8000/api/messages/";
		axios
			.post(url, body)
			.then(() => {
				this.setState({
					...this.state,
					loading: false,
					show: true,
					name: "",
					email: "",
					subject: "",
					message: "",
				});
				setTimeout(() => {
					this.setState({
						...this.state,
						show: false,
					});
				}, 5000);
			})
			.catch((err) => {
				const { message } = err;
				this.setState({
					...this.state,
					show: true,
					loading: false,
					error: message,
				});
				setTimeout(() => {
					this.setState({
						...this.state,
						show: false,
					});
				}, 5000);
			});
	};

	handleClose = () => {
		this.setState({
			...this.state,
			show: false,
			missing: false,
		});
	};

	handleMissing = () => {
		this.setState({
			...this.state,
			missing: true,
		});
	};

	render() {
		const {
			images,
			show,
			error,
			name,
			email,
			subject,
			message,
			loading,
			missing,
		} = this.state;
		return (
			<>
				{show && error && !loading ? (
					<Modal
						visible={show}
						title="Oops"
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Try again
							</Button>,
						]}
						style={{ color: "red" }}>
						<p className="lead">
							{" "}
							There was an error in sending your message.
							<br />
							Please check your internet connection and try again.
						</p>
					</Modal>
				) : show && !error && !loading ? (
					<Modal
						visible={show}
						title="Received"
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Close
							</Button>,
						]}
						style={{ color: "green" }}>
						<p className="lead">
							{" "}
							Thank you for reaching out.
							<br />I have received your message and will get back to you soon.
						</p>
					</Modal>
				) : missing ? (
					<Modal
						visible={show}
						title="Missing Fields"
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Close
							</Button>,
						]}>
						<p className="lead">
							{" "}
							You did not fill some fields.
							<br />
							Please ensure you provide your name and message in the contact
							form.
						</p>
					</Modal>
				) : null}
				<i className="bi bi-list mobile-nav-toggle d-xl-none"></i>

				<header id="header">
					<div className="d-flex flex-column">
						<div className="profile">
							{images.length > 0 ? (
								<img
									src={images[0].image}
									alt=""
									className="img-fluid rounded-circle"
								/>
							) : null}

							<h1 className="text-light">
								<a href="index.html">Joel Wekesa</a>
							</h1>
							<div className="social-links mt-3 text-center">
								<a href="tel:+254742649976" className="linkedin">
									<i className="bi bi-phone"></i>
								</a>
								<a href="#" className="twitter">
									<i className="bx bxl-twitter"></i>
								</a>
								<a href="#" className="facebook">
									<i className="bx bxl-facebook"></i>
								</a>
								<a href="#" className="instagram">
									<i className="bx bxl-instagram"></i>
								</a>
								<a href="https://github.com/JoelWekesa" className="google-plus">
									<i className="bx bxl-github"></i>
								</a>
								<a href="#" className="linkedin">
									<i className="bx bxl-linkedin"></i>
								</a>
							</div>
						</div>

						<nav id="navbar" className="nav-menu navbar">
							<ul>
								<li>
									<a href="#hero" className="nav-link scrollto active">
										<i className="bx bx-home"></i> <span>Home</span>
									</a>
								</li>
								<li>
									<a href="#about" className="nav-link scrollto">
										<i className="bx bx-user"></i> <span>About</span>
									</a>
								</li>
								<li>
									<a href="#resume" className="nav-link scrollto">
										<i className="bx bx-file-blank"></i> <span>Resume</span>
									</a>
								</li>
								<li>
									<a href="#portfolio" className="nav-link scrollto">
										<i className="bx bx-book-content"></i>{" "}
										<span>Portfolio</span>
									</a>
								</li>
								<li>
									<a href="#services" className="nav-link scrollto">
										<i className="bx bx-server"></i> <span>Why Choose Me?</span>
									</a>
								</li>
								<li>
									<a href="#contact" className="nav-link scrollto">
										<i className="bx bx-envelope"></i> <span>Contact</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				<section
					id="hero"
					className="d-flex flex-column justify-content-center align-items-center">
					<div className="hero-container" data-aos="fade-in">
						<h1> Hi, I'm Joel Wekesa. </h1>
						<p className="lead">
							I'm a{" "}
							<span
								className="typed"
								data-typed-items="seasoned software developer, telecommunications engineer, training data scientist, photographer"></span>
						</p>
					</div>
				</section>

				<main id="main">
					<section id="about" className="about">
						<div className="container">
							<div className="section-title">
								<h2>About</h2>
								<p className="lead">
									I'm an ambitious and results oriented software developer,
									fueled by the desire to create simple solutions to everyday
									complex problems.
								</p>
							</div>

							<div className="row">
								<div className="col-lg-4" data-aos="fade-right">
									{images.length > 0 ? (
										<img src={images[0].image} className="img-fluid" alt="" />
									) : null}
								</div>
								<div
									className="col-lg-8 pt-4 pt-lg-0 content"
									data-aos="fade-left">
									<h3>UI/UX Designer &amp; Web Developer.</h3>
									<p className="fst-italic">
										I love what I do, and that makes every work day a vacation.{" "}
									</p>
									<div className="row">
										<div className="col-lg-6">
											<ul>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Phone:</strong>{" "}
													<span>
														<a href="tel:+254742649976"> +254 742 649976</a>
													</span>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Email:</strong>{" "}
													<a href="mailto:joelwekesa.jw@gmail.com">
														joelwekesa.jw@gmail.com
													</a>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>City:</strong> <span>Nairobi, Kenya</span>
												</li>
											</ul>
										</div>
										<div className="col-lg-6">
											<ul>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Degree:</strong>{" "}
													<span>Telecommunications and IT</span>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Freelance:</strong> <span>Available</span>
												</li>
											</ul>
										</div>
									</div>
									<p className="lead">
										I'm focused on consistency, professionalism, and timely
										delivery. This focus allows me to create masterpieces out of
										every project I undertake.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section id="facts" className="facts">
						<div className="container">
							<div className="section-title">
								<h2>Facts</h2>
								<p className="lead">
									Here is a statistical lowdown of the clients I've worked with,
									the projects I've completed, hours of support on completed
									projects, and professionals I work with to ensure your
									projects are delivered beyond your expectations.
								</p>
							</div>

							<div className="row no-gutters">
								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up">
									<div className="count-box">
										<i className="bi bi-emoji-smile"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="96"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Happy Clients</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="count-box">
										<i className="bi bi-journal-richtext"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="218"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Completed Projects</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="200">
									<div className="count-box">
										<i className="bi bi-headset"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="1800"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Hours Of Support</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="300">
									<div className="count-box">
										<i className="bi bi-people"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="32"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Collaborating Professionals</strong>
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id="skills" className="skills section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Skills</h2>
								<p className="lead">
									I am a fullstack web developer with a bias in Django and React
									frameworks. I continue to learn other technologies to ensure
									quality and timely delivery.
								</p>
								<br />
							</div>

							<div className="row skills-content">
								<div className="col-lg-6" data-aos="fade-up">
									<div className="progress">
										<span className="skill">
											Django <i className="val">100%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="100"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											React <i className="val">98%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="98"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											Relational Databases <i className="val">95%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="95"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>
								</div>

								<div
									className="col-lg-6"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="progress">
										<span className="skill">
											Python <i className="val">98%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="98"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											Cryptography and encryption <i className="val">75%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="75"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											WordPress/CMS <i className="val">90%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow="90"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id="resume" className="resume">
						<div className="container">
							<div className="section-title">
								<h2>Resume</h2>
								<p>
									Magnam dolores commodi suscipit. Necessitatibus eius
									consequatur ex aliquid fuga eum quidem. Sit sint consectetur
									velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit
									suscipit alias ea. Quia fugiat sit in iste officiis commodi
									quidem hic quas.
								</p>
							</div>

							<div className="row">
								<div className="col-lg-6" data-aos="fade-up">
									<h3 className="resume-title">Sumary</h3>
									<div className="resume-item pb-0">
										<h4>Joel Wekesa</h4>
										<p>
											<em>
												Innovative and deadline-driven Graphic Designer with 3+
												years of experience designing and developing
												user-centered digital/print marketing material from
												initial concept to final, polished deliverable.
											</em>
										</p>
										<ul>
											<li>Portland par 127,Orlando, FL</li>
											<li>(123) 456-7891</li>
											<li>alice.barkley@example.com</li>
										</ul>
									</div>

									<h3 className="resume-title">Education</h3>
									<div className="resume-item">
										<h4>Master of Fine Arts &amp; Graphic Design</h4>
										<h5>2015 - 2016</h5>
										<p>
											<em>Rochester Institute of Technology, Rochester, NY</em>
										</p>
										<p>
											Qui deserunt veniam. Et sed aliquam labore tempore sed
											quisquam iusto autem sit. Ea vero voluptatum qui ut
											dignissimos deleniti nerada porti sand markend
										</p>
									</div>
									<div className="resume-item">
										<h4>Bachelor of Fine Arts &amp; Graphic Design</h4>
										<h5>2010 - 2014</h5>
										<p>
											<em>Rochester Institute of Technology, Rochester, NY</em>
										</p>
										<p>
											Quia nobis sequi est occaecati aut. Repudiandae et iusto
											quae reiciendis et quis Eius vel ratione eius unde vitae
											rerum voluptates asperiores voluptatem Earum molestiae
											consequatur neque etlon sader mart dila
										</p>
									</div>
								</div>
								<div
									className="col-lg-6"
									data-aos="fade-up"
									data-aos-delay="100">
									<h3 className="resume-title">Professional Experience</h3>
									<div className="resume-item">
										<h4>Senior graphic design specialist</h4>
										<h5>2019 - Present</h5>
										<p>
											<em>Experion, New York, NY </em>
										</p>
										<ul>
											<li>
												Lead in the design, development, and implementation of
												the graphic, layout, and production communication
												materials
											</li>
											<li>
												Delegate tasks to the 7 members of the design team and
												provide counsel on all aspects of the project.{" "}
											</li>
											<li>
												Supervise the assessment of all graphic materials in
												order to ensure quality and accuracy of the design
											</li>
											<li>
												Oversee the efficient use of production project budgets
												ranging from $2,000 - $25,000
											</li>
										</ul>
									</div>
									<div className="resume-item">
										<h4>Graphic design specialist</h4>
										<h5>2017 - 2018</h5>
										<p>
											<em>Stepping Stone Advertising, New York, NY</em>
										</p>
										<ul>
											<li>
												Developed numerous marketing programs (logos,
												brochures,infographics, presentations, and
												advertisements).
											</li>
											<li>
												Managed up to 5 projects or tasks at a given time while
												under pressure
											</li>
											<li>
												Recommended and consulted with clients on the most
												appropriate graphic design
											</li>
											<li>
												Created 4+ design presentations and proposals a month
												for clients and account managers
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id="portfolio" className="portfolio">
						<div className="container">
							<div className="section-title">
								<h2>Portfolio</h2>
								<p className="lead">
									I am the founder and creator of{" "}
									<a href="https://www.cladi.shop/">cladi.shop</a> cladi.shop is
									an online shopping platform that seeks to avail quality
									fashion at affordable prices. You can click{" "}
									<a href="https://www.cladi.shop/">here</a> to go to the
									website or watch the video bellow that demonstrates shopping
									on the website.
								</p>
							</div>

							<div
								className="container-iframe"
								data-aos="fade-up"
								data-aos-delay="100">
								<iframe
									className="responsive-iframe"
									src="https://www.youtube.com/embed/RYbvg4fGSEo"></iframe>
							</div>
						</div>
					</section>

					<section id="services" className="services section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Why choose me?</h2>
								<p className="lead">
									I pride myself in using comprehensive road maps to create
									modern, reliable, and scalable software products that meet
									your requirements and expectations. Here's a list of the
									services I offer.
								</p>
							</div>

							<div className="row">
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="icon">
										<i className="bi bi-bar-chart-steps"></i>
									</div>
									<h4 className="title">
										<a href="">Database Design and Implementation</a>
									</h4>
									<p className="description">
										I use best database design practices and principles to
										ensure information consistency, efficiently executing
										queries, zero data redundancy, and enhanced database
										performance.
									</p>
								</div>

								<div className="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
									<div className="icon">
										<i className="bi bi-code-slash"></i>
									</div>
									<h4 className="title">
										<a href="">Application Programming Interfaces (APIs)</a>
									</h4>
									<p className="description">
										Modern software systems are composed of many servers,
										services, and other components that communicate through
										APIs. I create stable, reliable, and easy to use APIs that
										guarantee scalability of your software systems.
									</p>
								</div>

								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="200">
									<div className="icon">
										<i className="bi bi-laptop"></i>
									</div>
									<h4 className="title">
										<a href="">UI/UX design</a>
									</h4>
									<p className="description">
										I create interactive, immersive, and easy to use UI/UX
										designs that attract prospective and existing clients to
										your website.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="300">
									<div className="icon">
										<i className="bi bi-binoculars"></i>
									</div>
									<h4 className="title">
										<a href="">Search Engine Optimization (SEO)</a>
									</h4>
									<p className="description">
										SEO is rapidly becoming an indispensable part of digital
										marketing. This realization motivates me to create websites
										that leverage on SEO to enhance web traffic, visibility and
										rankings, user experience, and general growth of my clients'
										businesses.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="400">
									<div className="icon">
										<i className="bi bi-gear-wide-connected"></i>
									</div>
									<h4 className="title">
										<a href="">Technical Support</a>
									</h4>
									<p className="description">
										With most of the systems I create being reliable and easy to
										use, technical support is essentially for client training
										and explanation of tech jargon. I offer tech support on
										demand, which is seldom.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="500">
									<div className="icon">
										<i className="bi bi-cash"></i>
									</div>
									<h4 className="title">
										<a href="">Cost Efficiency</a>
									</h4>
									<p className="description">
										Clients are the backbone of my freelance business. I
										understand that different clients have different
										requirements and financial abilities. For this reason, I use
										client-friendly pricing models that save on cost and favor a
										positive return on investment.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section id="testimonials" className="testimonials section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Testimonials</h2>
								<p>
									Magnam dolores commodi suscipit. Necessitatibus eius
									consequatur ex aliquid fuga eum quidem. Sit sint consectetur
									velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit
									suscipit alias ea. Quia fugiat sit in iste officiis commodi
									quidem hic quas.
								</p>
							</div>

							<div
								className="testimonials-slider swiper-container"
								data-aos="fade-up"
								data-aos-delay="100">
								<div className="swiper-wrapper">
									<div className="swiper-slide">
										<div className="testimonial-item" data-aos="fade-up">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Proin iaculis purus consequat sem cure digni ssim donec
												porttitora entum suscipit rhoncus. Accusantium quam,
												ultricies eget id, aliquam eget nibh et. Maecen aliquam,
												risus at semper.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-1.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Saul Goodman</h3>
											<h4>Ceo &amp; Founder</h4>
										</div>
									</div>

									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="100">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Export tempor illum tamen malis malis eram quae irure
												esse labore quem cillum quid cillum eram malis quorum
												velit fore eram velit sunt aliqua noster fugiat irure
												amet legam anim culpa.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-2.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Sara Wilsson</h3>
											<h4>Designer</h4>
										</div>
									</div>

									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="200">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Enim nisi quem export duis labore cillum quae magna enim
												sint quorum nulla quem veniam duis minim tempor labore
												quem eram duis noster aute amet eram fore quis sint
												minim.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-3.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Jena Karlis</h3>
											<h4>Store Owner</h4>
										</div>
									</div>
									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="300">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Fugiat enim eram quae cillum dolore dolor amet nulla
												culpa multos export minim fugiat minim velit minim dolor
												enim duis veniam ipsum anim magna sunt elit fore quem
												dolore labore illum veniam.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-4.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Matt Brandon</h3>
											<h4>Freelancer</h4>
										</div>
									</div>
									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="400">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Quis quorum aliqua sint quem legam fore sunt eram irure
												aliqua veniam tempor noster veniam enim culpa labore
												duis sunt culpa nulla illum cillum fugiat legam esse
												veniam culpa fore nisi cillum quid.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-5.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>John Larson</h3>
											<h4>Entrepreneur</h4>
										</div>
									</div>
								</div>
								<div className="swiper-pagination"></div>
							</div>
						</div>
					</section>

					<section id="contact" className="contact">
						<div className="container">
							<div className="section-title">
								<h2>Contact</h2>
								<p className="lead">
									I am reachable 24/7 through the contacts listed below. I
									always look forward to hearing from you.
								</p>
							</div>

							<div className="row" data-aos="fade-in">
								<div className="col-lg-5 d-flex align-items-stretch">
									<div className="info">
										<div className="address">
											<i className="bi bi-geo-alt"></i>
											<h4>Location:</h4>
											<p className="lead">Nairobi, Kenya</p>
										</div>

										<div className="email">
											<i className="bi bi-envelope"></i>
											<h4>Email:</h4>
											<p className="lead">
												<a href="mailto:joelwekesa.jw@gmail.com">
													joelwekesa.jw@gmail.com
												</a>
											</p>
										</div>

										<div className="phone">
											<i className="bi bi-phone"></i>
											<h4>Call:</h4>
											<p className="lead">
												<a href="tel:+254742649976"> +254 742 649976</a>
											</p>
										</div>

										<iframe
											src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15956.021117798682!2d36.91468875!3d-1.1567103999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1618942156298!5m2!1sen!2ske"
											frameBorder="0"
											style={{ border: 0, width: "100%", height: "290px" }}
											allowFullScreen></iframe>
									</div>
								</div>

								<div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
									<form
										action="forms/contact.php"
										// method='post'
										role="form"
										className="php-email-form">
										<div className="row">
											<div className="form-group col-md-6">
												<label htmlFor="name">Your Name</label>
												<input
													type="text"
													name="name"
													value={name}
													className="form-control"
													id="name"
													onChange={this.handleChange}
													required
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="name">Your Email</label>
												<input
													type="email"
													className="form-control"
													name="email"
													value={email}
													id="email"
													onChange={this.handleChange}
													required
												/>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="name">Subject</label>
											<input
												type="text"
												className="form-control"
												name="subject"
												value={subject}
												id="subject"
												onChange={this.handleChange}
												required
											/>
										</div>
										<div className="form-group">
											<label htmlFor="name">Message</label>
											<textarea
												className="form-control"
												name="message"
												value={message}
												rows="10"
												onChange={this.handleChange}
												required></textarea>
										</div>
										<div className="my-3">
											<div className="loading">Loading</div>
											<div className="error-message"></div>
											<div className="sent-message">
												Your message has been sent. Thank you!
											</div>
										</div>
										<div className="text-center">
											{name && message ? (
												<button type="submit" onClick={this.handleSubmit}>
													Send Message
												</button>
											) : loading ? (
												<LinearProgress />
											) : (
												<div className="disabled">
													<button
														type="submit"
														onClick={this.handleMissing}
														className="disabled">
														Send Message
													</button>
												</div>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer id="footer">
					<div className="container">
						<div className="copyright">
							&copy; Copyright{" "}
							<strong>
								<span>iPortfolio</span>
							</strong>
						</div>
						<div className="credits">
							Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
						</div>
					</div>
				</footer>
				<a
					href="#"
					className="back-to-top d-flex align-items-center justify-content-center">
					<i className="bi bi-arrow-up-short"></i>
				</a>
			</>
		);
	}
}

export default Home;
