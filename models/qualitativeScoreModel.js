const db = require('../config/db');

// 🟠 1. حساب Wi فقط (وزن كل مجال حسب عدد المؤشرات)
const getDomainWeights = async () => {
  const [totalRow] = await db.promise().query(`SELECT COUNT(*) AS total FROM indicators`);
  const totalIndicators = totalRow[0].total;

  const [domains] = await db.promise().query(`
    SELECT d.id AS domain_id, d.domain_ar AS domain_name, COUNT(i.id) AS indicator_count
    FROM domains d
    LEFT JOIN indicators i ON i.domain = d.id
    GROUP BY d.id
  `);

  return domains.map(row => ({
    domain_id: row.domain_id,
    domain_name: row.domain_name,
    indicator_count: row.indicator_count,
    domain_weight: totalIndicators > 0
      ? Number(((row.indicator_count / totalIndicators) * 100).toFixed(2))
      : 0
  }));
};

// 🟢 2. حساب Si فقط (درجة كل مجال حسب الردود)
const getDomainScores = async (programId) => {
  const [domains] = await db.promise().query(`
    SELECT d.id AS domain_id, d.domain_ar AS domain_name, COUNT(i.id) AS indicator_count
    FROM domains d
    LEFT JOIN indicators i ON i.domain = d.id
    GROUP BY d.id
  `);

  const results = [];

  for (const domain of domains) {
    const [responses] = await db.promise().query(`
      SELECT response
      FROM qlt_responses r
      JOIN indicators i ON r.indicator_id = i.id
      WHERE r.program_id = ? AND i.domain = ?
    `, [programId, domain.domain_id]);

    let yes = 0, somewhat = 0;
    responses.forEach(r => {
      if (r.response == 2) yes++;
      else if (r.response == 1) somewhat++;
    });

    const score = domain.indicator_count > 0
      ? Number((((2 * yes) + somewhat) / (2 * domain.indicator_count) * 100).toFixed(2))
      : 0;

    results.push({
      domain_id: domain.domain_id,
      domain_name: domain.domain_name,
      indicator_count: domain.indicator_count,
      domain_score: score
    });
  }

  return results;
};

// 🔵 3. حساب Wi × Si + Final Score
const getWeightedResults = async (programId) => {
  const weights = await getDomainWeights();
  const scores = await getDomainScores(programId);

  const final = weights.map(wi => {
    const score = scores.find(s => s.domain_id === wi.domain_id);
    const si = score ? score.domain_score : 0;

    const weighted = Number(((wi.domain_weight * si) / 100).toFixed(6));
    return {
      domain_id: wi.domain_id,
      domain_name: wi.domain_name,
      indicator_count: wi.indicator_count,
      domain_weight: wi.domain_weight,
      domain_score: si,
      domain_weighted_score: weighted
    };
  });

  const final_program_score = Number(
    final.reduce((sum, d) => sum + d.domain_weighted_score, 0).toFixed(2)
  );

  return {
    program_id: programId,
    result_by_domain: final,
    final_program_score
  };
};

module.exports = {
  getDomainWeights,
  getDomainScores,
  getWeightedResults
};
