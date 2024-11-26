use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct PriceLimit {
    pub min: f64,
    pub max: f64,
}
